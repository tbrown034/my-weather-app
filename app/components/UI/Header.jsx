"use client";
import Link from "next/link";
import Image from "next/image";
import Hamburger from "./Menu";
import { motion } from "framer-motion";
import Logo from "../../../public/Images/weatherLogo.png";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-3 ">
        <div className="w-12 transition-transform duration-300 ease-in-out sm:w-24 active:scale-75">
          <Image src={Logo} alt="logo" />
        </div>
        <Link
          className="font-bold transition-transform duration-300 ease-in-out sm:text-5xl text-1xl active:scale-75"
          href="/"
        >
          <motion.h1>WeatherApp</motion.h1>
        </Link>
        <Hamburger />
      </header>
    </>
  );
}
