function createChart() {

	var height = document.getElementById("viz").clientHeight;
	var width = document.getElementById("viz").clientWidth;

	var svg = d3.select("#viz").append("svg")
		.attr("width", "100%")
		.attr("height", "100%")


	d3.csv("../reference-data/brand_frequency.csv", function(error, data) {
		if (error) throw error;

		data.forEach(function(d) {
			d.frequency = +d.frequency
		})

		var numOfRows = data.length;
		var colHeight = height / numOfRows;

		// Set x-scale

		var xExtent = d3.extent(data, d => d.frequency);

		var xScale = d3.scaleLinear()
			.range([0, width])
			.domain([0, xExtent[1]]);

	    svg.selectAll(".bar")
	    .data(data)
	    .enter().append("rect")
	    .attr("class", "bar")
	    .attr("height", colHeight - 2)
	    .attr("width", d => xScale(d["frequency"]))
	    .attr("y", function(d, i) {return i * colHeight });
	})
}

function createVisual() {

	var height2 = document.getElementById("visual").clientHeight;
	var width2 = document.getElementById("visual").clientWidth;

	var svg = d3.select("#visual").append("svg")
		.attr("width", "100%")
		.attr("height", "100%")


	d3.csv("../reference-data/numbers.csv", function(error, data) {
		if (error) throw error;

		data.forEach(function(d) {
			d.count = +d.count
		})

		var numOfRows2 = data.length;
		var colHeight2 = height2 / numOfRows2;

		// Set x-scale

		var xExtent2 = d3.extent(data, d => d.count);

		var xScale2 = d3.scaleLinear()
			.range([0, width2])
			.domain([0, xExtent2[1]]);

	    svg.selectAll(".bar2")
	    .data(data)
	    .enter().append("rect")
	    .attr("class", "bar2")
	    .attr("height", colHeight2 - 2)
	    .attr("width", d => xScale2(d["count"]))
	    .attr("y", function(d, i) {return i * colHeight2 });
	})
}