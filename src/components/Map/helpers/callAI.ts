import React from "react";
import axios from "axios";
import lowerCase from "lodash/lowerCase";
import isString from "lodash/isString";

function cleanOverflow(rawResp: string) {
  console.log("rawResp", rawResp);
  const index = rawResp.lastIndexOf("{");

  console.log("-_-", rawResp.substring(0, index - 2) + "}]");
  return JSON.parse(rawResp.substring(0, index - 2) + "}]");
}

export async function callAI(prompt: string) {
  try {
    var data = JSON.stringify({
      prompt,
    });
    var config = {
      method: "post",
      // url: 'https://us-central1-aiot-fit-xlab.cloudfunctions.net/emend',
      url: "http://localhost:5000",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
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

    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}
