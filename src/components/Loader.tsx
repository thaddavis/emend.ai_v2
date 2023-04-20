import React from "react";
import Image from "next/image";

import LoadingSVG from "@/images/loading.svg";

export const Loader = () => {
  return (
    <Image
      src={LoadingSVG}
      width={200}
      height={200}
      className="loading-animation"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
      }}
      alt="Loading Icon"
    ></Image>
  );
};
