import { select, scaleLinear, scaleBand, axisBottom, axisRight, stack, max } from 'd3';
import React, { useEffect, useRef } from 'react';
import { useResizeObserver } from './useResizeObserver';

function BarChart() {
  const data = [
    { month: 'Auguest', in: 53, out: 43 },
    { month: 'September', in: 53, out: 23 },
    { month: 'October', in: 83, out: 193 },
    { month: 'November', in: 83, out: 13 },
    { month: 'December', in: 23, out: 10 },
    { month: 'January', in: 83, out: 13 },
  ];

  const svgRef = useRef();
  const wrapperRef = useRef()
  const dimention = useResizeObserver(wrapperRef)

  

  useEffect(() => {
    const svg = select(svgRef.current);
    if(!dimention) return;
    const xScale = scaleBand()
      .domain([...data.map((e, i) => e.month)])
      .range([0, dimention.width]).padding(0.2) 

   


    const stackGeneartor = stack().keys(['out','in'])

    const layers = stackGeneartor(data)



    const xAxis = axisBottom(xScale);
    const extend = [0,max(layers,layer=>max(layer,sequence=>sequence[1]))]

     const yScale = scaleLinear()
      .domain(extend)
      .range([dimention.height, 20]);

      const yAxis = axisRight(yScale)



  
    svg
      .select('.x-axis').style('transform',`translate(0,${dimention.height}px)`)
      .call(xAxis);

    svg.select('.domain').style('display', 'none');
    svg.selectAll('.tick line').style('display', 'none');

    svg.select('.y-axis').call(yAxis);
    svg.select('.domain').style('display', 'none');
    svg.selectAll('.tick line').style('display', 'none');

    const barWidth = 10;
    svg
      .selectAll('.layer').data(layers).join('g').attr('class','layer').attr('fill',layer=>layer.key==='in'?'#02BB7D':"#48B748").selectAll('rect').data(layer=>layer).join('rect')
      .attr('x', (sequence, index) => xScale(sequence.data.month) + (xScale.bandwidth() - barWidth) / 2) // Center the bar
      .attr('width',barWidth).attr('y',sequence=>yScale(sequence[1])).attr('height',sequence=>{
        return yScale(sequence[0]) - yScale(sequence[1])
      })

  }, [data,dimention]);

  return (
    <div className='svgContainer' ref={wrapperRef}>
      <svg  ref={svgRef} className='svg'>
        <g className='x-axis' />
        {/* <g className='y-axis' /> */}
      </svg>
    </div>
  );
 
}

export default BarChart;
