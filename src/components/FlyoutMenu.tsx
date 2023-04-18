import { Fragment } from "react";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import flooding from "@/images/flooding.png";
import water_quality_photo from "@/images/water_quality.png";

import humidity from "@/images/icons/metrics/svg/humidity.svg";
import airQuality from "@/images/icons/metrics/svg/air_quality.svg";
import rain from "@/images/icons/metrics/svg/rain.svg";
import waterQuality from "@/images/icons/metrics/svg/water_quality.svg";
import fog from "@/images/icons/metrics/svg/fog.svg";
import thermometer from "@/images/icons/metrics/svg/thermometer.svg";

import americas from "@/images/icons/regions/americas.svg";
import europe from "@/images/icons/regions/europe.svg";
import africa from "@/images/icons/regions/africa.svg";
import asia from "@/images/icons/regions/asia.svg";
import island from "@/images/icons/regions/island.svg";
import volcano from "@/images/icons/regions/volcano.svg";

export const FlyoutMenu = (props: any) => {
  const { onItemClick } = props;

  const metrics = [
    {
      name: "Temperature",
      onClick: () => {
        onItemClick("Temperature");
      },
      icon: thermometer,
    },
    {
      name: "Rainfall",
      onClick: () => {
        onItemClick("Rainfall");
      },
      icon: rain,
    },
    {
      name: "Humidity",
      onClick: () => {
        onItemClick("Humidity");
      },
      icon: humidity,
    },
    {
      name: "Air Quality",
      onClick: () => {
        onItemClick("Air Quality");
      },
      icon: airQuality,
    },
    {
      name: "Water Quality",
      onClick: () => {
        onItemClick("Water Quality");
      },
      icon: waterQuality,
    },
  ];

  //   const regions = [
  //     {
  //       name: 'Americas',
  //       onClick: () => {
  //         onItemClick('Americas')
  //       },
  //       icon: americas,
  //     },
  //     {
  //       name: 'Europe',
  //       onClick: () => {
  //         onItemClick('Europe')
  //       },
  //       icon: europe,
  //     },
  //     {
  //       name: 'Africa',
  //       onClick: () => {
  //         onItemClick('Africa')
  //       },
  //       icon: africa,
  //     },
  //     {
  //       name: 'Asia',
  //       onClick: () => {
  //         onItemClick('Asia')
  //       },
  //       icon: asia,
  //     },
  //     {
  //       name: 'Caribbean',
  //       onClick: () => {
  //         onItemClick('Caribbean')
  //       },
  //       icon: island,
  //     },
  //     {
  //       name: 'Volcanic',
  //       onClick: () => {
  //         onItemClick('Volcanic')
  //       },
  //       icon: volcano,
  //     },
  //   ]

  const recentPosts = [
    {
      id: 1,
      title: "Flooding",
      href: null,
      onClick: () => {
        onItemClick("Flooding");
      },
      category: { title: "Coastal", href: "#" },
      imageUrl: flooding,
    },
    {
      id: 2,
      title: "Water Quality",
      href: null,
      onClick: () => {
        onItemClick("Water Quality");
      },
      category: { title: "Coastal", href: "#" },
      imageUrl: water_quality_photo,
    },
  ];

  return (
    <Popover className="absolute bottom-0 isolate z-50 w-full shadow">
      <div className="bg-white py-5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            Menu
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </Popover.Button>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Panel className="absolute inset-x-0 top-0 -z-10 bg-white pt-16 shadow-lg ring-1 ring-gray-900/5">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-10 lg:grid-cols-2 lg:px-8">
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
              <div>
                <h3 className="text-sm font-medium leading-6 text-gray-500">
                  Metrics
                </h3>
                <div className="mt-6 flow-root">
                  <div className="-my-2">
                    {metrics.map((item) => (
                      <div
                        key={item.name}
                        className="flex cursor-pointer gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900"
                        onClick={item.onClick}
                      >
                        <Image
                          src={item.icon}
                          alt={item.name}
                          className="h-6 w-6 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
              <h3 className="sr-only">Recent posts</h3>
              {recentPosts.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                >
                  <div className="relative flex-none">
                    <Image
                      className="aspect-[2/1] w-full rounded-lg bg-gray-100 object-cover sm:aspect-[16/9] sm:h-32 lg:h-auto"
                      src={post.imageUrl}
                      alt={post.title}
                    />
                    <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-x-4">
                      <h5 className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100">
                        {post.category.title}
                      </h5>
                    </div>
                    <h4
                      className="mt-2 cursor-pointer text-sm font-semibold leading-6 text-gray-900"
                      onClick={post.onClick}
                    >
                      <span className="absolute inset-0" />
                      {post.title}
                    </h4>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
