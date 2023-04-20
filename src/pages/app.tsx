import React from "react";

import { Map } from "../components/Map/Map";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <Head>
        <title>Map</title>
      </Head>
      <Map />
      <ToastContainer />
    </>
  );
}
