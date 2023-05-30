import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/Images/weatherLogo.png";

export default function Footer() {
  return (
    <footer className="px-6 py-10 text-white bg-sky-900">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <Link className="flex items-center" href="/">
            <Image src={Logo} alt="logo" height={74}></Image>
          </Link>
          <div className="font-bold ">WeatherApp</div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm sm:justify-center">
          <Link href="/">Home</Link>
          <Link href="/current">Current Weather</Link>
          <Link href="/forecast">Tomorrow's Forecast</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
      <div className="py-4 space-y-2">
        <div className="h-px bg-white"></div>
        <div>© 2023 MyWeatherApp™. All Rights Reserved.</div>
      </div>
    </footer>
  );
}
