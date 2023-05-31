"use client";
import { Popover } from "@headlessui/react";
import Link from "next/link";

export default function Hamburger() {
  return (
    <>
      <Popover className="relative">
        <Popover.Button className="p-2 border-2 border-white rounded-lg sm:text-2xl text-1xl hover:bg-white hover:text-sky-800 active:bg-sky-700 active:text-white focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-sky-500">
          Menu
        </Popover.Button>

        <Popover.Panel className="absolute right-0 z-20 mt-2 rounded-lg shadow-lg sm:mt-4 w-60 bg-sky-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 divide-y divide-gray-100">
            <Link
              href="/current"
              className="block px-2 py-2 text-sm leading-5 text-gray-700 hover:bg-sky-50 hover:text-gray-900"
            >
              Current Weather
            </Link>
            <Link
              href="/forecast"
              className="block px-2 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Tomorrow&apos;s Weather
            </Link>
            <Link
              href="/timer"
              className="block px-2 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Sunrise and Sunset Timer
            </Link>
            <Link
              href="/about"
              className="block px-2 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              About
            </Link>
          </div>
        </Popover.Panel>
      </Popover>
    </>
  );
}
