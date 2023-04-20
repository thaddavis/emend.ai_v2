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
import { drawMatches } from "./helpers/drawMatches";

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

  let svg;
  let projection;

  useEffect(() => {
    if (!size) {
      return;
    }

    d3.select("#chart-area").select("svg").remove();
    d3.select("#chart-area").select("#chart-tooltip").remove();

    const { width, height } = size;

    svg = d3
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
            let lazyzoom = debounce(function () {
              svg.attr("transform", event.transform);
              drawMatches(
                d3,
                svg,
                projection,
                AIresp.val,
                mapStateRef.current,
                size
              );
            }, 16);
            lazyzoom();
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

    projection = d3
      .geoMercator()
      .fitSize([size.width * scaleFactor, size.height * scaleFactor], map)
      .center([0, 0])
      .translate([size.width / 2, size.height / 2]);

    drawMap(d3, svg, map, projection, AIresp.val, mapStateRef.current, size);
    drawMatches(d3, svg, projection, AIresp.val, mapStateRef.current, size);
  }, [size, AIresp]);

  useEffect(() => {
    var panelTriggers = document.getElementsByClassName("js-cd-panel-trigger");
    if (panelTriggers.length > 0) {
      for (var i = 0; i < panelTriggers.length; i++) {
        (function (i) {
          var panelClass =
              "js-cd-panel-" + panelTriggers[i].getAttribute("data-panel"),
            panel = document.getElementsByClassName(panelClass)[0];
          // open panel when clicking on trigger btn
          panelTriggers[i].addEventListener("click", function (event) {
            if (
              hasClass(event.target, "js-cd-close") ||
              hasClass(event.target, panelClass)
            ) {
              event.preventDefault();
              removeClass(panel, "cd-panel--is-visible");

              let el1 = document.querySelector("#ribbon");
              removeClass(el1, "js-cd-close");
              el1.textContent = "+";
            } else {
              addClass(panel, "cd-panel--is-visible");

              let el1 = document.querySelector("#ribbon");
              addClass(el1, "js-cd-close");
              el1.textContent = "-";
            }
          });

          //close panel when clicking on 'x' or outside the panel
          panel.addEventListener("click", function (event) {
            if (
              hasClass(event.target, "js-cd-close") ||
              hasClass(event.target, panelClass)
            ) {
              event.preventDefault();
              removeClass(panel, "cd-panel--is-visible");

              let el = document.querySelector("#ribbon");
              removeClass(el, "js-cd-close");
              el.textContent = "+";
            }
          });
        })(i);
      }
    }

    //class manipulations - needed if classList is not supported
    //https://jaketrent.com/post/addremove-classes-raw-javascript/
    function hasClass(el, className) {
      if (el.classList) return el.classList.contains(className);
      else
        return !!el.className.match(
          new RegExp("(\\s|^)" + className + "(\\s|$)")
        );
    }
    function addClass(el, className) {
      if (el.classList) el.classList.add(className);
      else if (!hasClass(el, className)) el.className += " " + className;
    }
    function removeClass(el, className) {
      if (el.classList) el.classList.remove(className);
      else if (hasClass(el, className)) {
        var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
        el.className = el.className.replace(reg, " ");
      }
    }
  }, []);

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
        callAI={async (queryContent) => {
          try {
            console.log("calling A.I.", queryContent);

            setModalState({
              isModalOpen: false,
              promptTemplate: "",
            });

            setAIresp({
              value: null,
              loading: true,
              error: null,
            });

            const results = await callAI(queryContent);

            // console.log("*** results ***", results);

            setAIresp({
              val: results,
              loading: false,
              error: null,
            });
          } catch (e) {
            console.error(e);
            setAIresp({
              val: [],
              loading: false,
              error: e,
            });
          }
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
