"use client";
import { Popover } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Hamburger() {
  return (
    <>
      <Popover className="relative">
        <Popover.Button className="p-2 border-2 border-white rounded-lg hover:bg-white hover:text-sky-800 active:bg-sky-700 active:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
          Menu
        </Popover.Button>

        <Popover.Panel className="absolute left-0 right-0 z-10 w-full max-w-full sm:w-64">
          <div className="flex flex-col rounded-lg bg-sky-400">
            <Link href="/current">Current Weather</Link>
            <Link href="/forecast">Tomorrow's Weather</Link>
            <Link href="/timer">Sunrise and Sunset Timer</Link>
            <Link href="/about">About</Link>
          </div>
        </Popover.Panel>
      </Popover>
    </>
  );
}
