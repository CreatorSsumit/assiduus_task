import { axisBottom,  axisLeft,  axisRight,  curveCardinal,  line, scaleLinear, select } from 'd3'
import React, { useEffect, useRef, useState } from 'react'
import { useResizeObserver } from './useResizeObserver'

function Checking_account(props) {
  

 const [data, setData] = useState([])
 const svgRef = useRef()
 const wrapperRef = useRef();
 const dimention = useResizeObserver(wrapperRef)


 useEffect(() => {
  getDataByMonth()
 }, [props])
 


 const getDataByMonth = () => {
  let filteredValues = props?.data?.reduce((acc, e) => {
    if (new Date(e.date).toLocaleDateString('en-US', { month: 'short' }) === props?.selectedMonth) {
      acc.push(e.value);
    }
    return acc;
  }, []);

  setData(filteredValues)
}



  useEffect(() => {

    const svg = select(svgRef.current);
    if(!dimention) return;
  
    const xScale = scaleLinear().domain([-1/2,data.length-1]).range([0,dimention.width-20]);
    const yScale = scaleLinear().domain([Math.min(...data),Math.max(...data)]).range([dimention.height,20]);

    const xAxis = axisBottom(xScale).tickFormat((index=>index >= 0 ? index + 1 : ''));
    const yAxis = axisRight(yScale)
 
    svg.select('.x-axis').style('transform',`translateY(${dimention.height}px)`).call(g => {
      g.call(xAxis);
      g.select('.domain').style('display', 'none'); 
      g.selectAll('.tick line').style('display', 'none'); 
    });

    // svg.select('.y-axis').call(g => {
    //   g.call(yAxis);
    //   g.select('.domain').style('display', 'none'); 
    //   g.selectAll('.tick line').style('display', 'none'); 
    // });

    const myLine = line().x((value,index)=>xScale(index)).y(yScale).curve(curveCardinal);

    svg.selectAll('.linestroke').data([data]).join('path').attr('class','linestroke').attr('d',myLine).attr('fill','none').attr('stroke','#94CCA7').attr('stroke-width', 2);
    
  }, [data,dimention])
  
  return (
    <div className='svgContainer' ref={wrapperRef}>
      <svg ref={svgRef} className='svg' >
        <g className='x-axis' />
        {/* <g className='y-axis' /> */}
      </svg>
    </div>
  )
}

export default Checking_account