
  var csv_file = "../data/advertiser_biplot_view.csv"

  // get default values
  var race = document.getElementById("race_dropdown").value
  var gender = document.getElementById("gender_dropdown").value
  var category = document.getElementById("category_dropdown").value

  // get column names we'll reference in the csv
  var x_variable = race + gender + "MillionHours"
  var y_variable = category

  // get axis labels
  var clean_category = document.getElementById('category_dropdown').options[document.getElementById('category_dropdown').selectedIndex].innerHTML
  var category_label = clean_category + " Prominence (% of Time)"
  var viewership_label = race + " " + gender + " Viewing (Millions of Hours)"

  var x_variable_axis_label = viewership_label
  var y_variable_axis_label = category_label

  // setting formating for chart
  var margin = {top: 50, right: 50, bottom: 50, left: 50},
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;


  // create our svg

  var svg = d3.select("#CategoryBiplot").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")





  // Add the tooltip container to the vis container
  // it's invisible and its position/contents are defined during mouseover
  var tooltip = d3.select("#CategoryBiplot").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  // tooltip mouseover event handler
  var tipMouseover = function(d) {

      // get default values
      var race = document.getElementById("race_dropdown").value
      var gender = document.getElementById("gender_dropdown").value
      var category = document.getElementById("category_dropdown").value


    // get column names we'll reference in the csv
    var x_variable = race + gender + "MillionHours"
    var y_variable = category


      var html  = "<span style='color: black; font-weight: bold'>" + d.national_network + "</span><br>"
      html = html + "<span style='color: black'>  Category Prominence: " + Math.floor(d[y_variable] * 1000)/10 + "%</span><br>";
      html = html + "<span style='color: black'>  Category Time: " + Math.floor(d[y_variable] * d[x_variable] * 10)/10 + " Million Hours</span>";

      tooltip.html(html)
          .style("left", (d3.event.pageX - document.getElementById('CategoryBiplot').offsetLeft + 15) + "px")
          .style("top", (d3.event.pageY - document.getElementById('CategoryBiplot').offsetTop + 10) + "px")
        .transition()
          .duration(200) // ms
          .style("opacity", .9) // started as 0!

      d3.select(this).transition()
            .duration(300)
            .style("opacity", .8);
  };

    // tooltip mouseout event handler
  var tipMouseout = function(d) {
      tooltip.transition()
          .duration(300) // ms
          .style("opacity", 0); // don't care about position!

      d3.select(this).transition()
          .duration(300)
          .style("opacity", ".5");

  };





  // setting scale based on formating
  var xScale = d3.scaleLinear()
      .range([0, width]);

  var yScale = d3.scaleLinear()
      .range([height, 0]);

  var zScale = d3.scaleLinear()
      .range([3, 30]);


  //create the axes
  var formatPercent = d3.format(".0%");
  var xAxis = d3.axisBottom().scale(xScale)
  var yAxis = d3.axisLeft().scale(yScale).tickFormat(formatPercent)





  // now let's run on top of the data!

  d3.csv(csv_file, function(error, data) {
      if (error) throw error;


      // create data
      // each object when read is initially a string, this makes everything a number
      data.forEach(function(d) {
        d[x_variable] = +d[x_variable];
        d[y_variable] = +d[y_variable];
      });

      // this presets the low and high end to reflect the data
      xScale.domain(d3.extent(data, function(d) { return d[x_variable]; })).nice();
      yScale.domain(d3.extent(data, function(d) { return d[y_variable]; })).nice();
      zScale.domain(d3.extent(data, function(d) { return d[x_variable] * d[y_variable]; }));

      // x axis & labeling
      // creating a svg group
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)

      // y axis & labeling
      // creating a svg group
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)

      // text label for the y axis
      svg.append("text")
          .attr("class", "y axis label")
          .attr("transform", "rotate(-90)")
          .attr("font-family", "Archivo Narrow")
          .attr("y", 0 - margin.left)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text(y_variable_axis_label);    


      // text label for the x axis
      svg.append("text")             
          .attr("class", "x axis label")
          .attr("transform",
                "translate(" + (width/2) + " ," + 
                               (height + margin.top - 10) + ")")
          .attr("font-family", "Archivo Narrow")
          .style("text-anchor", "middle")
          .text(x_variable_axis_label)
          .style("color", "black")

      // place dots
      svg.selectAll(".dot")
          .data(data)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", function(d) { return zScale(d[x_variable]*d[y_variable]); })
          .attr("cx", function(d) { return xScale(d[x_variable]); })
          .attr("cy", function(d) { return yScale(d[y_variable]); })
          .on("mouseover", tipMouseover)
          .on("mouseout", tipMouseout)
          .style("fill", 'rgb(0,0,100)')
          .attr("opacity",.5)
    });

function updateBiplot() {
    
  // get default values
  var race = document.getElementById("race_dropdown").value
  var gender = document.getElementById("gender_dropdown").value
  var category = document.getElementById("category_dropdown").value

  // get column names we'll reference in the csv
  var x_variable = race + gender + "MillionHours"
  var y_variable = category

  // get axis labels
  var clean_category = document.getElementById('category_dropdown').options[document.getElementById('category_dropdown').selectedIndex].innerHTML
  var category_label = clean_category + " Prominence (% of Time)"
  var viewership_label = race + " " + gender + " Viewing (Millions of Hours)"

  var x_variable_axis_label = viewership_label
  var y_variable_axis_label = category_label

    d3.csv(csv_file, function(error, data) {
       if (error) throw error;

      // create data
      // each object when read is initially a string, this makes everything a number
      data.forEach(function(d) {
        d[x_variable] = +d[x_variable];
        d[y_variable] = +d[y_variable];
      });

      // this presets the low and high end to reflect the data
      xScale.domain(d3.extent(data, function(d) { return d[x_variable]; })).nice();
      yScale.domain(d3.extent(data, function(d) { return d[y_variable]; })).nice();
      zScale.domain(d3.extent(data, function(d) { return d[x_variable]*d[y_variable]; })).nice();


      // update dots
      svg.selectAll(".dot")
          .transition()
          .duration(2000)
          .attr("cx", function(d) { return xScale(d[x_variable]); })
          .attr("cy", function(d) { return yScale(d[y_variable]); })
          .attr("r", function(d) { return zScale(d[x_variable]*d[y_variable]); })


      // update labels
      document.getElementsByClassName('x axis label')[0].innerHTML = x_variable_axis_label
      document.getElementsByClassName('y axis label')[0].innerHTML = y_variable_axis_label

      // update the x axis
      svg.select(".x")
          .transition()
          .duration(2000)
          .call(xAxis)

      // update the y axis
      svg.select(".y")
          .transition()
          .duration(2000)
          .call(yAxis)
    });

  }
