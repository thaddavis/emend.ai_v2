import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

import type { ComponentPropsWithoutRef } from "react";

interface SvgProps extends ComponentPropsWithoutRef<"svg"> {
  id: string;
}

import { Container } from "@/components/Container";
import { DiamondIcon } from "@/components/DiamondIcon";
import { useRouter } from "next/router";

import americas from "@/images/icons/regions/americas.svg";
import europe from "@/images/icons/regions/europe.svg";
import africa from "@/images/icons/regions/africa.svg";
import asia from "@/images/icons/regions/asia.svg";
import island from "@/images/icons/regions/island.svg";
import volcano from "@/images/icons/regions/volcano.svg";

import humidity from "@/images/icons/metrics/svg/humidity.svg";
import airQuality from "@/images/icons/metrics/svg/air_quality.svg";
import rain from "@/images/icons/metrics/svg/rain.svg";
import waterQuality from "@/images/icons/metrics/svg/water_quality.svg";
import fog from "@/images/icons/metrics/svg/fog.svg";
import thermometer from "@/images/icons/metrics/svg/thermometer.svg";

import flooding from "@/images/icons/coasts/flooding.svg";
import biodiversity from "@/images/icons/coasts/biodiversity.svg";

const features = [
  {
    name: "Metrics",
    key: "2022-04-04",
    dimensions: [
      {
        name: "Temperature",
        image: thermometer,
      },
      {
        name: "Rainfall",
        image: rain,
      },
      {
        name: "Humidity",
        image: humidity,
      },
      {
        name: "Air Quality",
        image: airQuality,
      },
      {
        name: "Water Quality",
        image: waterQuality,
      },
    ],
  },
  {
    name: "Coasts",
    key: "2022-04-06",
    dimensions: [
      {
        name: "Flooding",
        image: flooding,
      },
      {
        name: "Water Quality",
        image: waterQuality,
      },
    ],
  },
];

function ImageClipPaths({ id, ...props }: SvgProps) {
  return (
    <svg aria-hidden="true" width={0} height={0} {...props}>
      <defs>
        <clipPath id={`${id}-0`} clipPathUnits="objectBoundingBox">
          <path d="M0,0 h0.729 v0.129 h0.121 l-0.016,0.032 C0.815,0.198,0.843,0.243,0.885,0.243 H1 v0.757 H0.271 v-0.086 l-0.121,0.057 v-0.214 c0,-0.032,-0.026,-0.057,-0.057,-0.057 H0 V0" />
        </clipPath>
        <clipPath id={`${id}-1`} clipPathUnits="objectBoundingBox">
          <path d="M1,1 H0.271 v-0.129 H0.15 l0.016,-0.032 C0.185,0.802,0.157,0.757,0.115,0.757 H0 V0 h0.729 v0.086 l0.121,-0.057 v0.214 c0,0.032,0.026,0.057,0.057,0.057 h0.093 v0.7" />
        </clipPath>
        <clipPath id={`${id}-2`} clipPathUnits="objectBoundingBox">
          <path d="M1,0 H0.271 v0.129 H0.15 l0.016,0.032 C0.185,0.198,0.157,0.243,0.115,0.243 H0 v0.757 h0.729 v-0.086 l0.121,0.057 v-0.214 c0,-0.032,0.026,-0.057,0.057,-0.057 h0.093 V0" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function PlatformFeatures() {
  let id = useId();
  let router = useRouter();
  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }: any) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <section
      id="speakers"
      aria-labelledby="speakers-title"
      className="py-20 sm:py-32"
    >
      <ImageClipPaths id={id} />
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="speakers-title"
            className="font-display text-4xl font-medium tracking-tighter text-blue-600 sm:text-5xl"
          >
            Data Platform
          </h2>
          <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
            Unparalleled insight into the most pressing environmental concerns
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24 lg:grid-cols-4"
          vertical={tabOrientation === "vertical"}
        >
          <div className="relative -mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:block sm:overflow-visible sm:pb-0">
            <div className="absolute bottom-0 left-0.5 top-2 hidden w-px bg-slate-200 lg:block" />
            <Tab.List className="grid auto-cols-auto grid-flow-col justify-start gap-x-8 gap-y-10 whitespace-nowrap px-4 sm:mx-auto sm:max-w-2xl sm:grid-cols-3 sm:px-0 sm:text-center lg:grid-flow-row lg:grid-cols-1 lg:text-left">
              {/* @ts-ignore: */}
              {({ selectedIndex }) =>
                features.map((item, itemIndex) => (
                  <div key={item.key} className="relative lg:pl-8">
                    <DiamondIcon
                      className={clsx(
                        "absolute left-[-0.5px] top-[0.5625rem] hidden h-1.5 w-1.5 overflow-visible lg:block",
                        itemIndex === selectedIndex
                          ? "fill-blue-600 stroke-blue-600"
                          : "fill-transparent stroke-slate-400"
                      )}
                    />
                    <div className="relative">
                      <div
                        className={clsx(
                          "font-mono text-sm",
                          itemIndex === selectedIndex
                            ? "text-blue-600"
                            : "text-slate-500"
                        )}
                      >
                        <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                          <span className="absolute inset-0" />
                          {item.name}
                        </Tab>
                      </div>
                    </div>
                  </div>
                ))
              }
            </Tab.List>
          </div>
          <Tab.Panels className="lg:col-span-3">
            {features.map((item) => (
              <Tab.Panel
                key={item.key}
                className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-16 md:grid-cols-3 [&:not(:focus-visible)]:focus:outline-none"
                unmount={false}
              >
                {item.dimensions.map((subItem, subItemIndex) => (
                  <div key={subItemIndex}>
                    <div className="group relative h-[17.5rem] transform overflow-hidden rounded-4xl">
                      <div
                        className={clsx(
                          "absolute bottom-6 left-0 right-4 top-0 rounded-4xl border transition duration-300 group-hover:scale-95 xl:right-6",
                          [
                            "border-blue-300",
                            "border-indigo-300",
                            "border-sky-300",
                          ][subItemIndex % 3]
                        )}
                      />
                      <div
                        className="absolute inset-0 bg-indigo-50"
                        style={{ clipPath: `url(#${id}-${subItemIndex % 3})` }}
                        onClick={() => {
                          router.push("/charts.html");
                        }}
                      >
                        <Image
                          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
                          src={subItem.image}
                          alt={subItem.name}
                          priority
                          sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                    </div>
                    <h3 className="mt-8 font-display text-xl font-bold tracking-tight text-slate-900">
                      {subItem.name}
                    </h3>
                  </div>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </Container>
    </section>
  );
}
