function getVertices() {
  return ['Dragos', 'Lucas', 'Marco'];
}

var xValues = getVertices();
var yValues = getVertices();

var zValues = [[0, 1, 2], [1, 0, 2], [1, 2, 0]];

var colorscaleValue = [
    [0, '#ffffff'],
    [1, '#001f3f']
];

var data = [{
    x: xValues,
    y: yValues,
    z: zValues,
    type: 'heatmap',
    colorscale: colorscaleValue,
    showscale: false
}];

var layout = {
    annotations: [],
    xaxis: {
        ticks: '',
        side: 'bottom'
    },
    yaxis: {
        ticks: '',
    ticksuffix: ' ',
    width: 700,
    height: 700,
    autosize: false
    }
};

/*
    for ( var i = 0; i < yValues.length; i++ ) {
    for ( var j = 0; j < xValues.length; j++ ) {
var currentValue = zValues[i][j];
if (currentValue != 0.0) {
  var textColor = 'white';
}else{
  var textColor = 'black';
}
var result = {
  xref: 'x1',
  yref: 'y1',
  x: xValues[j],
  y: yValues[i],
  text: zValues[i][j],
  font: {
    family: 'Arial',
    size: 12,
    color: 'rgb(50, 171, 96)'
  },
  showarrow: false,
  font: {
    color: textColor
  }
};
layout.annotations.push(result);
}
}
*/

Plotly.newPlot('myDiv', data, layout);

console.log(yValues);