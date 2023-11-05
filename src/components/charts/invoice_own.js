import { axisBottom, axisRight, scaleBand, scaleLinear, select } from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import { useResizeObserver } from './useResizeObserver';

function Invoice_own() {
  const [data, setdata] = useState([
    { startDate: new Date('2023-01-10'), endDate: new Date('2023-02-20'), value: 100 },
    { startDate: new Date('2023-10-01'), endDate: new Date('2023-11-08'), value: 150 },
    { startDate: new Date('2023-11-09'), endDate: new Date('2023-11-16'), value: 120 },
    { startDate: new Date('2023-11-17'), endDate: new Date('2024-11-24'), value: 170 },
    { startDate: new Date('2023-11-25'), endDate: new Date('2024-11-31'), value: 170 },
    { startDate: new Date('2023-12-04'), endDate: new Date('2024-12-10'), value: 170 },
  ]);
  const svgRef = useRef();
  const wrapperRef = useRef()
  const dimention = useResizeObserver(wrapperRef)

  

  useEffect(() => {
    const svg = select(svgRef.current);
    if(!dimention) return;
    const xScale = scaleBand()
      .domain([0,...data.map((e, i) => i)])
      .range([0, dimention.width]) 

    const yScale = scaleLinear()
      .domain([0, Math.max(...data.map(e=>e.value))])
      .range([dimention.height, 20]);


      const customTickFormat = (index) => {
        const dateRange = data[index];
        const endMonth = dateRange.endDate.getMonth();
        const currentDate = new Date(); 
        const currentMonth = currentDate.getMonth();
      
        if ( endMonth < currentMonth) {
          return 'older';
        } else if (endMonth > currentMonth){
          return 'future';
        } else {
            const currentDatestr = currentDate.toLocaleDateString('en-US', { month: 'short' });
          const startMonthStr = dateRange.startDate.toLocaleString('en-US', { month: 'short' });
          const endMonthStr = dateRange.endDate.toLocaleString('en-US', { month: 'short' });
          const startDate =  startMonthStr + ' ' + dateRange.startDate.getDate();
          const endDate = currentDatestr === endMonthStr && currentDatestr == startMonthStr ?dateRange.endDate.getDate(): endMonthStr + ' ' + dateRange.endDate.getDate();
      
          return startDate + '-' + endDate;
        }
      };
    

    const xAxis = axisBottom(xScale).tickFormat(i=> customTickFormat(i))
    const yAxis = axisRight(yScale);

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
      .selectAll('.bar')
      .data(data.map(e=>e.value))
      .join('rect')
      .attr('class', 'bar')
      .attr('fill', '#47B747')
      .attr('x', (value, index) => xScale(index) + (xScale.bandwidth() - barWidth) / 2) // Center the bar
      .attr('width', barWidth) 
      .attr('y', (value) => yScale(value))
      .attr('height', (value) => dimention.height - yScale(value))
      .attr('rx', 4) // Set the horizontal radius
      .attr('ry', 4);

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

export default Invoice_own;
