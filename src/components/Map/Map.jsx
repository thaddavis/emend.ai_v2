import React, { useRef, useEffect, useState, Suspense } from "react";
import Image from "next/image";
import * as d3 from "d3";
import { useResize } from "@/hooks/useResize";
import { drawMap } from "./helpers/drawMap";
import { callAI } from "./helpers/callAI";

import { Modal } from "../Modal";
import { FlyoutMenu } from "../FlyoutMenu";
import { Loader } from "../Loader";
import map from "./world.json";

import debounce from "lodash/debounce";

import AI from "@/images/icons/ai.svg";

export const Map = () => {
  const rootRef = useRef(null);
  const size = useResize(rootRef);

  const [AIresp, setAIresp] = useState({
    loading: false,
    val: [],
    error: null,
  });
  const [modalState, setModalState] = useState({
    isModalOpen: false,
    promptTemplate: "",
  });

  const mapStateRef = React.useRef();

  useEffect(() => {
    if (!size) {
      return;
    }

    d3.select("#chart-area").select("svg").remove();
    d3.select("#chart-area").select("#chart-tooltip").remove();

    const { width, height } = size;

    const svg = d3
      .select("#chart-area")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(
        d3.zoom().transform,
        d3.zoomIdentity
          .translate(
            mapStateRef.current ? mapStateRef.current.x : 0,
            mapStateRef.current ? mapStateRef.current.y : 0
          )
          .scale(mapStateRef.current ? mapStateRef.current.k : 1)
      )
      .call(
        d3
          .zoom()
          .on("zoom", function (event) {
            // console.log("event", event);

            let lazyzoom = debounce(function () {
              svg.attr("transform", event.transform);
            }, 500);

            lazyzoom();
            // svg.attr("transform", event.transform);
            mapStateRef.current = event.transform;
          })
          .scaleExtent([1, 10])
      )
      .append("g")
      .attr(
        "transform",
        `translate(${mapStateRef.current ? mapStateRef.current.x : 0}, ${
          mapStateRef.current ? mapStateRef.current.y : 0
        }) scale(${mapStateRef.current ? mapStateRef.current.k : 1})`
      );

    console.log("mapStateRef.current ->", mapStateRef.current);

    let scaleFactor =
      size.width > size.height
        ? size.width / size.height
        : size.height / size.width;

    let projection = d3
      .geoMercator()
      .fitSize([size.width * scaleFactor, size.height * scaleFactor], map)
      .center([0, 0])
      .translate([size.width / 2, size.height / 2]);

    drawMap(d3, svg, map, projection, AIresp.val, mapStateRef.current);
  }, [size, AIresp]);

  console.log("AIresp.loading", AIresp.loading);

  return (
    <>
      {AIresp.loading && <Loader />}
      <button
        className="absolute bottom-0 m-4 p-2 inline-flex items-center justify-center w-20 h-20 bg-[#2463eb] rounded-full hover:white"
        onClick={() => {
          setModalState({
            isModalOpen: true,
            promptTemplate: "",
          });
        }}
      >
        <Image
          src={AI}
          alt={"Ask Prompt"}
          priority
          sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </button>
      <Modal
        isModalOpen={modalState.isModalOpen}
        promptTemplate={modalState.promptTemplate}
        setModalState={setModalState}
        callAI={async (promptTemplate, queryContent) => {
          console.log("calling A.I.", promptTemplate);

          setModalState({
            isModalOpen: false,
            promptTemplate: "",
          });

          setAIresp({
            value: null,
            loading: true,
            error: null,
          });

          // const res = await callAI(promptTemplate, queryContent);

          setAIresp({
            val: [
              {
                lon: -80.1918,
                lat: 25.7617,
                blurb:
                  "Miami is a coastal city located in Florida. It is know for its beautiful beaches, lavish lifestyle, and nightlife.",
              },
            ],
            loading: false,
            error: null,
          });
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{ height: "100%", width: "100%" }}
          className="chart-area"
          id="chart-area"
          ref={rootRef}
        ></div>
      </div>
    </>
  );
};
