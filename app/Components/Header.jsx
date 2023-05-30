import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/Images/weatherLogo.png";
import Hamburger from "./Menu";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-3 text-white bg-sky-900">
        <div className="w-1/12 transition-transform duration-300 ease-in-out active:scale-75">
          <Image src={Logo} alt="logo" />
        </div>
        <Link
          className="font-bold transition-transform duration-300 ease-in-out sm:text-5xl text-1xl active:scale-75"
          href="/"
        >
          WeatherApp
        </Link>
        <Hamburger />
      </header>
    </>
  );
}
