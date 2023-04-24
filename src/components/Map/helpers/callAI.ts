import React from "react";
import axios from "axios";
import lowerCase from "lodash/lowerCase";
import isString from "lodash/isString";

import { toast } from "react-toastify";

function cleanOverflow(rawResp: string) {
  console.log("rawResp", rawResp);
  const index = rawResp.lastIndexOf("{");

  // console.log("-_-", rawResp.substring(0, index - 2) + "}]");
  // return JSON.parse(rawResp.substring(0, index - 2) + "}]");
  return JSON.parse(rawResp);
}

export async function callAI(prompt: string) {
  try {
    var data = {
      prompt,
    };
    var config = {
      method: "post",
      url: "https://s1vpd61w24.execute-api.us-east-1.amazonaws.com/queryAI",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    let res = await axios(config);

    console.log("res", res);

    if (isString(res.data)) {
      console.log("isString TRUE");

      return cleanOverflow(res.data);
    } else {
      console.log("isString FALSE");
      return res.data;
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
