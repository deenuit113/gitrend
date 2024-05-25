import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TrendChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // 기존의 svg 요소를 제거합니다.

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.stargazers_count)])
      .nice()
      .range([height, 0]);

    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    chart.append('g')
      .call(d3.axisLeft(y));

    chart.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    chart.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.stargazers_count))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.stargazers_count))
      .attr('fill', 'steelblue');

  }, [data]);

  return <svg ref={svgRef} width="800" height="400"></svg>;
};

export default TrendChart;