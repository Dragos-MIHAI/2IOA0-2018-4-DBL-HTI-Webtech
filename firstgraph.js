
var graph = d3.select("body")
              .append("svg");
            
var w = 900,
    h = 400;
    
graph.attr("width", w)
     .attr("height", h);
     

var vertices = [{"id":"Marco"},{"id":"Lucas"},{"id":"Dragos"}];
                
var links = [{"source":"Marco","target":"Marco","value":"1"},{"source":"Marco","target":"Lucas","value":"0.6947"},{"source":"Marco","target":"Dragos","value":"0.3967"},{"source":"Lucas","target":"Marco","value":"0.6947"},{"source":"Lucas","target":"Lucas","value":"1"},{"source":"Lucas","target":"Dragos","value":"0.2850"},{"source":"Dragos","target":"Marco","value":"0.3967"},{"source":"Dragos","target":"Lucas","value":"0.2850"},{"source":"Dragos","target":"Dragos","value":"1"}];
            
            
            
            
var force = d3.layout.force()
    .size([w, h])
    .nodes(vertices)
    .links(links)
    .on("tick", tick)
    .linkDistance(250)
    .start();
      
     
var link = graph.selectAll(".link")
                 .data(links)
                 .enter()
                 .append("line")
                 .attr("class", "link")
                 .style("stroke", "rgb(6,120,155)");

	 
var vertices = graph.selectAll(".vertices")
                    .data(vertices)
                    .enter()
                    .append("svg:circle")
                    .attr("class", "vertices")
                    .attr("r", "10px")
                    .attr("fill", "red");
         
     
      
function tick(e) {
  
  vertices.attr("cx", function(d) { return d.x;})
          .attr("cy", function(d) { return d.y;})
          .call(force.drag);
          
          
  link.attr("x1", function(d) { return d.source.x;})
      .attr("y1", function(d) { return d.source.y;})
      .attr("x2", function(d) { return d.target.x;})
      .attr("y2", function(d) { return d.target.y;})
}
     
     
     