import React from "react";
import axios from "axios";
import lowerCase from "lodash/lowerCase";
import isString from "lodash/isString";

import { toast } from "react-toastify";

function cleanOverflow(rawResp: string) {
  rawResp.trim();
  const index = rawResp.lastIndexOf("{");
  return JSON.parse(rawResp.substring(0, index - 2) + "}]");
}

export async function callAI(prompt: string) {
  try {
    var data = {
      prompt,
    };
    var config = {
      method: "post",
      // url: "https://s1vpd61w24.execute-api.us-east-1.amazonaws.com/queryAI-v2",
      url: "http://localhost:5000",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    let res = await axios(config);

    console.log("res", res);
    console.log("res", res.data.body);

    if (
      isString(res.data.body) &&
      res.data.body[res.data.body.length] !== '"' &&
      res.data.body[res.data.body.length - 1] !== "]" &&
      res.data.body[res.data.body.length - 2] !== "}"
    ) {
      console.log("isString TRUE");

      return cleanOverflow(res.data.body);
    } else {
      console.log("isString FALSE");
      return JSON.parse(res.data.body);
    }
  } catch (e) {
    console.error(e);

    toast.error("Error fetching results for query", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return [];
  }
}
