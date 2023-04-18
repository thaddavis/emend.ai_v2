export function drawMap(d3, svg, map, projection, matches = [], svgTransform) {
  let tooltip;

  const showTooltip = function (evt, d) {
    tooltip = d3
      .select("#chart-area")
      .append("div")
      .style("opacity", 0)
      .style("position", "absolute")
      .attr("id", "chart-tooltip")
      .style("background-color", "white")
      .style("border-radius", "5px")
      .style("border", "3px solid #2463eb")
      .style("padding", "1em")
      .style("margin", "1em")
      .style("color", "black");

    tooltip.transition().duration(200);
    tooltip
      .style("opacity", 1)
      .html(d.blurb)
      .style("left", evt.clientX + 16 + "px")
      .style("top", evt.clientY + 16 + "px");
  };

  const moveTooltip = function (evt) {
    tooltip
      .style("left", evt.clientX + 16 + "px")
      .style("top", evt.clientY + 16 + "px");
  };

  const hideTooltip = function (evt) {
    tooltip.transition().duration(200).style("opacity", 0);
  };

  const mapPaths = svg
    .attr("transform", svgTransform)
    .append("g")
    .attr("id", "zoom-container")
    .selectAll("path")
    .data(map.features);

  mapPaths
    .join("path")
    .on("click", function (e) {
      console.log(e);
    })
    .attr("fill", function (d) {
      return "rgba(255,255,255, 0.5)";
    })
    .transition()
    .duration(2000)
    .attr("fill", function (d) {
      return "rgba(255,255,255, 0.5)";
    })
    .attr("d", d3.geoPath().projection(projection))
    .style("stroke", "rgba(0,0,0, 0.5)");

  // draw matches
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].blurb && matches[i].lat && matches[i].lat) {
      let lat = matches[i].lat;
      let lon = matches[i].lon;
      svg
        .append("g")
        .selectAll("circle")
        .data([{ lon, lat }], (d) => "d")
        .join("circle")
        .on("mouseover", (evt) => {
          // console.log("!@#!@#!@# mouseover", evt);
          showTooltip(evt, matches[i]);
        })
        .on("mousemove", (evt) => {
          // console.log("!@#!@#!@# mousemove");
          moveTooltip(evt, matches[i]);
        })
        .on("mouseleave", (evt) => {
          // console.log("!@#!@#!@# mouseleave");
          hideTooltip(evt);
        })
        .attr("cx", function (d) {
          return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d) {
          return projection([d.lon, d.lat])[1];
        })
        .attr("r", 5)
        .attr("fill", function (d) {
          return "rgba(184,184,184, 1.0)";
        })
        .transition()
        .duration(2000)
        .attr("fill", function (d) {
          return "rgba(184,184,184, 1)";
        })
        .attr("d", d3.geoPath().projection(projection))
        .style("opacity", 1)
        .style("stroke", "rgba(0,0,0, 1.0)");
    }
  }
}
