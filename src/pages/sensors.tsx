import { Nav } from "@/components/Nav";
import Image from "next/image";

import tempC_vs_time from "@/images/charts/tempC_vs_time.png";
import rain_vs_time from "@/images/charts/rain_vs_time.png";
import air_quality_vs_time from "@/images/charts/air_quality_vs_time.png";

import { SensorBlock } from "@/components/SensorBlock";

export default function Sensors() {
  return (
    <>
      <Nav />
      <SensorBlock
        title={"SCD40"}
        subtitle={"Temperature Analysis"}
        image={tempC_vs_time}
      />
      <SensorBlock
        title={"Arduino"}
        subtitle={"Water Quality"}
        image={rain_vs_time}
      />

      <SensorBlock
        title={"Senserion"}
        subtitle={"Air Quality Analysis"}
        image={air_quality_vs_time}
      />
    </>
  );
}
