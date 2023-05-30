import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/Images/weatherLogo.png";
export default function Footer() {
  return (
    <>
      <footer className="px-6 py-10 text-white bg-sky-900">
        <div className="flex justify-between gap-8 ">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <Image src={Logo} alt="logo" height={74}></Image>
            </Link>
            <div className="text-xl font-bold ">WeatherApp</div>
          </div>
          <div className="flex items-center gap-2 text-sm text-end">
            <Link href="/">Home</Link>
            <Link href="/">Current Weather</Link>
            <Link href="/">Tomorrow's Forecast</Link>
            <Link href="/">Tomorrow's Forecast</Link>
          </div>
        </div>
        <div className="py-4 space-y-2">
          <div className="h-px bg-white"></div>
          <div>© 2023 MyWeatherApp™. All Rights Reserved.</div>
        </div>
      </footer>
    </>
  );
}
