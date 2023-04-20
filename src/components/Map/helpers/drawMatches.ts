export function drawMatches(
  d3: any,
  svg: any,
  projection: any,
  matches: { lat: number; lon: number; blurb: string }[] = [],
  svgTransform: any,
  size: {
    width: number;
    height: number;
  },
  setIsDrawerOpen: (isOpen: boolean) => {}
) {
  d3.select("#chart-area").selectAll("#query-matches").remove();
  d3.select("#chart-area").selectAll("#chart-tooltip").remove();

  let tooltip: any;

  const showTooltip = function (
    evt: any,
    d: any,
    hPlacement: {
      placement: "left" | "right";
      offset: number;
    },
    vPlacement: {
      placement: "top" | "bottom";
      offset: number;
    }
  ) {
    tooltip = d3
      .select("#chart-area")
      .append("div")
      .style("opacity", 0)
      .style("position", "absolute")
      .attr("id", "chart-tooltip")
      .style("background-color", "white")
      .style("border-radius", "5px")
      .style("border", "2px solid #2463eb")
      .style("padding", "1em")
      .style("margin", "1em")
      .style("color", "black");

    tooltip.transition().duration(200);

    tooltip
      .style("opacity", 1)
      .html(d.blurb)
      .style(hPlacement.placement, hPlacement.offset + "px")
      .style(vPlacement.placement, vPlacement.offset + "px");
  };

  const moveTooltip = function (
    evt: any,
    hPlacement: {
      placement: "left" | "right";
      offset: number;
    },
    vPlacement: {
      placement: "top" | "bottom";
      offset: number;
    }
  ) {
    tooltip
      .style(hPlacement.placement, hPlacement.offset + "px")
      .style(vPlacement.placement, vPlacement.offset + "px");
  };

  const hideTooltip = function (evt: any) {
    d3.select("#chart-area").selectAll("#chart-tooltip").remove();
  };

  // draw matches
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].blurb && matches[i].lat && matches[i].lat) {
      let lat = matches[i].lat;
      let lon = matches[i].lon;
      svg
        .append("g")
        .attr("id", "query-matches")
        .selectAll("circle")
        .data([{ lon, lat }], (d: any) => "")
        .join("circle")
        .on("mouseover", (evt: any) => {
          //   console.log("!@#!@#!@# mouseover", evt);
          //   console.log(size);

          let hPlacement: {
            placement: "left" | "right";
            offset: number;
          };

          let vPlacement: {
            placement: "top" | "bottom";
            offset: number;
          };

          if (size.width / 2 < evt.clientX) {
            hPlacement = {
              placement: "right",
              offset: size.width - evt.clientX,
            };
          } else {
            hPlacement = {
              placement: "left",
              offset: evt.clientX,
            };
          }

          if (size.height / 2 < evt.clientY) {
            vPlacement = {
              placement: "bottom",
              offset: size.height - evt.clientY,
            };
          } else {
            vPlacement = {
              placement: "top",
              offset: evt.clientY,
            };
          }

          showTooltip(evt, matches[i], hPlacement, vPlacement);
        })
        .on("mousemove", (evt: any) => {})
        .on("mouseleave", (evt: any) => {
          hideTooltip(evt);
        })
        .on("click", (evt: any) => {
          console.log("click");
          setIsDrawerOpen(true);
        })
        .attr("cx", function (d: any) {
          return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d: any) {
          return projection([d.lon, d.lat])[1];
        })
        .attr("r", 8 / ((svgTransform && svgTransform.k) || 1))
        .attr("fill", function (d: any) {
          return "rgba(36, 99, 235, 1.0)";
        })
        .style("opacity", 1)
        .style("stroke", "rgba(0,0,0, 1.0)");
    }
  }
}
