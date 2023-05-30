import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/Images/weatherLogo.png";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 text-white bg-sky-600">
        <div className="w-1/12">
          <Image src={Logo} alt="logo" />
        </div>
        <Link className="text-5xl font-bold text-center " href="/">
          WeatherApp
        </Link>
        <div className="w-1/12 ">
          <Bars3Icon />
        </div>
      </header>
    </>
  );
}
