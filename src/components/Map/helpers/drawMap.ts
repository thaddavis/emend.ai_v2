export function drawMap(
  d3: any,
  svg: any,
  map: any,
  projection: any,
  matches: { lat: number; lon: number; blurb: string }[] = [],
  svgTransform: any,
  size: {
    width: number;
    height: number;
  }
) {
  const mapPaths = svg
    .attr("transform", svgTransform)
    .append("g")
    .attr("id", "zoom-container")
    .selectAll("path")
    .data(map.features);

  mapPaths
    .join("path")
    .on("click", function (evt: any) {
      console.log(evt);
    })
    .attr("fill", function (d: any) {
      return "rgba(255,255,255, 0.5)";
    })
    .transition()
    .duration(2000)
    .attr("fill", function (d: any) {
      return "rgba(255,255,255, 0.5)";
    })
    .attr("d", d3.geoPath().projection(projection))
    .style("stroke", "rgba(0,0,0, 0.5)");
}
