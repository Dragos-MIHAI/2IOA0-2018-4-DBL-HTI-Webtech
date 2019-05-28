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
