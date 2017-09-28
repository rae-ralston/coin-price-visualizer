import React, {Component} from 'react'
import * as d3 from 'd3'

export default class PriceLineGraph extends Component {
  constructor(props) {
    super(props)
  }

  getDefaultProps: () => ({
    width: 800,
    height: 300,
    chartId: 'v1_chart'
  })

  render() {
    let data = this.props.data

    let margin = {top: 5, right: 50, bottom: 20, left: 50},
      w = this.props.width - (margin.left + margin.right),
      h = this.props.height - (margin.top + margin.bottom);

    let parseDate = d3.time.format("%m-%d-%Y").parse;

    data.forEach(d => {
      console.log(parseDate(d.date))
      d.date = parseDate(d.date)
    })

    let x = d3.time.scale()
        .domain(d3.extent(data, d => d.date))
        .rangeRound([0, w]);

    let y = d3.scale.linear()
        .domain([0,d3.max(data, d => d.count+100)])
        .range([h, 0])

    let line = d3.svg.line()
        .x(d => x(d.date))
        .y(d => y(d.count)).interpolate('cardinal')

    let transform = `translate(${margin.left}, ${margin.top})`

    return (
      <div>
        <svg id={this.props.chartId} width={this.props.width} height={this.props.height}>
          <g transform={transform}>
            <path className="line shadow" d={line(data)} strokeLinecap="round"/>
          </g>
        </svg>
      </div>
    )
  }
}
