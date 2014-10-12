var graph = new Rickshaw.Graph({
  element: document.querySelector("#chart"),
  renderer: 'line',
  preserve: true,
  height: "200",
  series: [{
    data: Paychecks.chartData(),
    color: 'steelblue'
  }]
});

graph.render();

var xAxis = new Rickshaw.Graph.Axis.X({
  graph: graph
});

var yAxis = new Rickshaw.Graph.Axis.Y({
  graph: graph
});

yAxis.render();
xAxis.render();