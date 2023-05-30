export default function About() {
  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen px-6 py-20 bg-sky-400 text-slate-200">
        <h1 className="py-4 text-6xl">About</h1>
        <div className="space-y-4 text-lg text-slate-800">
          <p>My WeatherApp is a project created by Trevor Brown. </p>
          <ul className="list-disc list-inside">
            This site was built using a tech stack that includes:
            <li>React</li>
            <li>NextJS</li>
            <li>Tailwind</li>
            <li>HeroIcons</li>
            <li>Headless UI</li>
          </ul>

          <p className="text-2xl text-slate-600">Thanks for visiting!</p>
        </div>
      </section>
    </>
  );
}
