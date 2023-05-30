"use client";
import { Menu } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Hamburger() {
  return (
    <>
      <Menu>
        <Menu.Button>
          <div className="w-10 sm:w-20">
            <Bars3Icon />
          </div>
        </Menu.Button>
      </Menu>
    </>
  );
}
