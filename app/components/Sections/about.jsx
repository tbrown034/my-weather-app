export default function About() {
  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen px-60">
        <h1 className="text-6xl text-center pb-14">About</h1>
        <div className="flex flex-col gap-4 text-xl">
          <div>
            <p>
              My WeatherApp is a project created by
              <span className="font-bold text-yellow-400">
                Trevor Brown
              </span>.{" "}
            </p>
          </div>
          <div>
            <ul className="list-disc list-inside">
              This site was built using a{" "}
              <span className="font-bold text-yellow-400">tech stack</span> that
              includes:
              <li className="font-semibold text-yellow-400">React</li>
              <li className="font-semibold text-yellow-400">NextJS</li>
              <li className="font-semibold text-yellow-400">Tailwind</li>
              <li className="font-semibold text-yellow-400">HeroIcons</li>
              <li className="font-semibold text-yellow-400">Headless UI</li>
            </ul>
          </div>

          <p>
            Thanks for{" "}
            <span className="font-bold text-yellow-400">visiting</span>!
          </p>
        </div>
      </section>
    </>
  );
}
