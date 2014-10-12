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