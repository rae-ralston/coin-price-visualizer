import React from 'react'
import * as d3 from 'd3'


// CONVERTING NOTES FROM TALK TO REACT



let data = fetch('https://min-api.cryptocompare.com/data/histohour?fsym=LUN&tsym=USD&limit=60&aggregate=3&e=CCCAGG')
  .then(response => response.json())
  .then(parsedResponse => parsedResponse.Data.map(priceObj => (
      { time: priceObj.time, price: priceObj.close}
    ))
  )

console.log('IN D3', data)
//define margin
let margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//define svg
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Define range for x and y coordinates
// use width of SVG to define how wide our chart will be
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.02);

//Define how tall chart will be; in SVG coordinate space we start drawing from
//the top left corner and as Y increases you go down.
var y = d3.scaleLinear()
    .range([height, 0]);

//define domain
x.domain(data.map(d => d.name));
y.domain([0, d3.max(data, d => d.value)]);

//define X(xAxis) and Y(yAxis) axis
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

//draw x and y axes. Note: don't forget to move xAxis down
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

//add the attributes based on scaled data
svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", (d, i) => `bar_${i + 1}`)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("x", d => x(d.name))
    .attr("width", x.bandwidth())//Returns the width of each band.
    .attr("y", d => y(d.value))
    .attr("height", d => height - y(d.value)) //Returns scaled height of each bar

export default svg
