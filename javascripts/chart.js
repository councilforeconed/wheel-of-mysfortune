/* globals d3 */

function Chart(selector, width, height) {
  this.svg = d3.select(selector).append('svg').attr('width', width).attr('height', height);

  this.width = width;
  this.height = height;

  this.padding = 40;

  this.data = [0];

  this.xWidth = this.data.length - 1;
  this.yHeight = d3.max(this.data);

  this.xScale = d3.scale.linear()
     .domain([0, this.xWidth])
     .range([this.padding, this.width - this.padding]);

  this.yScale = d3.scale.linear()
     .domain([0, this.yHeight])
     .range([this.height - this.padding, this.padding]);

  this.xAxis = d3.svg.axis()
      .scale(this.xScale)
      .orient("bottom");

  this.yAxis = d3.svg.axis()
      .scale(this.yScale)
      .orient("left")
      .tickFormat(function(d) { return "$" + d; });

  this.xAxisChart = this.svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (this.height - this.padding) + ")")
      .call(this.xAxis);

  this.yAxisChart = this.svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + this.padding + ",0)")
      .call(this.yAxis);

  this.lineOfBestFit = this.svg.append('line')
      .attr('x1', this.padding)
      .attr('y1', this.height - this.padding)
      .attr('x2', this.width - this.padding)
      .attr('y2', this.padding)
      .attr('stroke-width', 2)
      .attr('stroke', '#FFF5D5');

  this.line = d3.svg.line()
      .x(function(d, i) { return this.xScale(i); }.bind(this))
      .y(function(d) { return this.yScale(d); }.bind(this))
      .interpolate('linear');

  this.path = this.svg.append('svg:path')
     .attr('d', this.line(this.data))
     .attr("stroke", "#99C987")
     .attr('stroke-width', 2)
     .attr('fill', 'none');

  this.svg.append("text")
      .attr("x", this.width - this.padding * 2.2)
      .attr("y", this.height - this.padding * 1.1)
      .text("Paychecks");
}

Chart.prototype.addValue = function (value) {
  this.data.push(value);
  this.updateChart();
};

Chart.prototype.updateChart = function () {
  var duration = 500;

  this.xWidth = this.data.length - 1;
  this.yHeight = d3.max(this.data);

  this.xScale.domain([0, this.xWidth]);
  this.yScale.domain([0, this.yHeight]);

  this.xAxisChart.transition().duration(duration).call(this.xAxis);
  this.yAxisChart.transition().duration(duration).call(this.yAxis);

  this.path.transition().duration(duration).attr('d', this.line(this.data));
};

var chart = new Chart('#chart', 580, 480);