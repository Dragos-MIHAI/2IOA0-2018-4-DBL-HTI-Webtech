let vertices = []; // The JSON object as {"id": 'vertexName'}
let names = []; // We want to be able to get the vertexName by means of its index
let verticesIndex = {}; // We will use this later to not have to search for each index separately. This will make the running time shorter
let vertex = "";
let links = [];
let dict = {} // An object as {'vertexName' : frequency}
let frequencies = [] // The order of vertices by frequency
let frequencyMatrixColumns = [] // The matrix with columns AND rows ordered by frequency
let matrix = [];

axios
.get(
  "https://raw.githubusercontent.com/Dragos-MIHAI/2IOA0-2018-4-DBL-HTI-Webtech/master/GephiMatrix_co-authorship.csv"
)
.then(function(result) {
  input = result.data;
  input = input.slice(1,input.length);
  items = input.split(/[\s;]+/);
  createData();

});

function createData() { // In this function, we get the vertices, their names and their indexes. We then create a JSON file in which the links are per vertex ordered by name
    let dictionaryWord = {}; // This object keeps getting added to vertices as {"id": 'vertexName'}, as a JSON file
    dictionaryWord = {"id": items[0]} // This will be the object we keep adding first to vertices, then with a slight change to links
    vertices.push(dictionaryWord);
    names.push(items[0]);
    verticesIndex[items[0]] = 0;
    let index = 1; // This was necessary because our loop invariant wouldn't hold, since the first item, items[0], obviously equals items[0]
    while (items[index] != items[0]) {
        dictionaryWord = {"id": items[index]};
        vertices.push(dictionaryWord);
        names.push(items[index]);
        verticesIndex[items[index]] = index;
        index++;
    }
    console.log(JSON.stringify(vertices)); // Uncomment for debugging

    vertex = items[index]; // Will contain the name of the source vertex of the links untill we went past all its adjacent vertices
    index++;
    let row = []
    while (index < items.length) {
        row = []
        for (let i = 0; i < vertices.length; i++) {
            if (items[index] != 0) { // Checks if the weight is not 0 so that there is actually an edge
                dictionaryWord = {"source": vertex, "target": names[i], "value": items[index]}; // JSON file for links, containing source, target (from, to) and value (weight)
                links.push(dictionaryWord);
            }
            row.push(items[index]);
            index++;
        }
        vertex = items[index]; // After vertices.length steps, we checked all possible adjacent vertices and thus we can take the next vertex, which is now at items[index]
        matrix.push(row)
        index++;
    }
    console.log(JSON.stringify(matrix)); // Uncomment for debugging
}

function Information(options) {
	var margin = {top: 50, right: 50, bottom: 100, left: 100},
	    width = 500,
	    height = 500,
	    data = options.data,
	    block = options.block,
	    namesData = options.names,
	    colour1 = options.colour_1,
	    colour2 = options.colour_2,
			highlightCellOnHover = options.highlight_cell_on_hover,
      highlightCellColor = options.highlight_cell_color;

	var widthLegend = 100;

//get the minimum and maximum value of the data
    var maxValue = d3.max(data, function(layer) { return d3.max(layer, function(d) { return d; }); });
    var minValue = d3.min(data, function(layer) { return d3.min(layer, function(d) { return d; }); });

	var numrows = data.length;
	var numcols = data[0].length;

//matrix size
	var svg = d3.select(block).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
		.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//matrix outline
	var background = svg.append("rect")
	    .style("stroke", "#CA5959")
	    .style("stroke-width", "5px")
	    .attr("width", width)
	    .attr("height", height);

	var x = d3.scale.ordinal()
	    .domain(d3.range(numcols))
	    .rangeBands([0, width]);

	var y = d3.scale.ordinal()
	    .domain(d3.range(numrows))
	    .rangeBands([0, height]);

//scale the colour of boxes with mininum and maximum values
	var colorMap = d3.scale.linear()
	    .domain([minValue,maxValue])
	    .range([colour1, colour2]);

	var row = svg.selectAll(".row")
	    .data(data)
	  	.enter().append("g")
	    .attr("class", "row")
	    .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });


	var cell = row.selectAll(".cell")
	    .data(function(d) { return d; })
			.enter().append("g")
	    .attr("class", "cell")
	    .attr("transform", function(d, i) { return "translate(" + x(i) + ", 0)"; });

	cell.append('rect')
	    .attr("width", x.rangeBand())
	    .attr("height", y.rangeBand())
	    .style("stroke-width", 0);



			if(highlightCellOnHover){
		cell
		.on("mouseover", function(d) {
				d3.select(this).style("fill", highlightCellColor);
		})
		.on("mouseout", function() {
				d3.select(this).style("fill", colorMap);
		});
}



	row.selectAll(".cell")
	    .data(function(d, i) { return data[i]; })
	    .style("fill", colorMap);

	var names = svg.append('g')
		.attr('class', "names");

	var columnLabels = names.selectAll(".column-label")
	    .data(namesData)
	    .enter().append("g")
	    .attr("class", "column-label")
	    .attr("transform", function(d, i) { return "translate(" + x(i) + "," + height + ")"; });

	columnLabels.append("line")
	    .attr("x1", x.rangeBand() / 2)
	    .attr("x2", x.rangeBand() / 2)
	    .attr("y1", 0)
	    .attr("y2", 5);

	columnLabels.append("text")
	    .attr("x", -8)
	    .attr("y", y.rangeBand() / 2)
	    .attr("dy", ".82em")
	    .attr("text-anchor", "end")
	    .text(function(d, i) { return d; })
			.attr("transform", "rotate(-45)");


	var rowLabels = names.selectAll(".row-label")
	    .data(namesData)
	  .enter().append("g")
	    .attr("class", "row-label")
	    .attr("transform", function(d, i) { return "translate(" + 0 + "," + y(i) + ")"; });

	rowLabels.append("line")
	    .attr("x1", 0)
	    .attr("x2", -5)
	    .attr("y1", y.rangeBand() / 2)
	    .attr("y2", y.rangeBand() / 2);

	rowLabels.append("text")
	    .attr("x", -8)
	    .attr("y", y.rangeBand() / 2)
	    .attr("dy", ".32em")
	    .attr("text-anchor", "end")
	    .text(function(d, i) { return d; });



//highlight cell



}
