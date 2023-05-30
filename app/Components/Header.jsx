import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/Images/weatherLogo.png";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 text-white bg-sky-600">
        <div className="w-1/4">
          <Image src={Logo} alt="logo" height={75} />
        </div>
        <Link className="w-1/2 text-xl font-bold text-center" href="/">
          WeatherApp
        </Link>
        <div className="w-1/4 text-right">Menu</div>
      </header>
    </>
  );
}
