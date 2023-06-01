import Current from "./current/page";
import Forecast from "./forecast/page";
import About from "./about/page";
import Timer from "./timer/page";
import CityInput from "./Components/CityInput";

export default function Home() {
  return (
    <>
      <CityInput />
      <Current />
      <Forecast />
      <Timer />
      <About />
    </>
  );
}
