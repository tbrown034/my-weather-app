import Current from "./current/page";
import Forecast from "./forecast/page";
import About from "./about/page";
import Timer from "./timer/page";

export default function Home() {
  return (
    <>
      <Current />
      <Forecast />
      <Timer />
      <About />
    </>
  );
}
