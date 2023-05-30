import Current from "./current/page";
import Forecast from "./forecast/page";
import About from "./about/page";

export default function Home() {
  return (
    <>
      <Current />
      <Forecast />
      <About />
    </>
  );
}
