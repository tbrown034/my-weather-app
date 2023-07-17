import { motion, animate, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const dropSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" height="50"><path d="M10.5,8c0-3.49-3.3-5.74-3.44-5.83a1,1,0,0,0-1.12,0C5.8,2.27,2.5,4.55,2.5,8a4,4,0,0,0,8,0Zm-4,2a2,2,0,0,1-2-2,5.44,5.44,0,0,1,2-3.72A5.39,5.39,0,0,1,8.5,8,2,2,0,0,1,6.5,10ZM18.06,2.17a1,1,0,0,0-1.12,0C16.8,2.27,13.5,4.55,13.5,8a4,4,0,0,0,8,0C21.5,4.51,18.2,2.26,18.06,2.17ZM17.5,10a2,2,0,0,1-2-2,5.44,5.44,0,0,1,2-3.72A5.39,5.39,0,0,1,19.5,8,2,2,0,0,1,17.5,10Z"/></svg>`;
const sunSVG = `<svg fill="none" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" stroke="orange" height="100"><path stroke-linecap="square" d="M7.5 1.5v-1m0 13.99v-.998m6-5.997h1m-13 0h-1m2-4.996-1-1m12 0-1 1m-10 9.993-1 1m12 0-1-1m-2-4.997a2.999 2.999 0 0 1-3 2.998 2.999 2.999 0 1 1 3-2.998z"/></svg>`;

const Raindrop = ({ delay }) => {
  const ref = useRef();
  const [y, setY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const element = ref.current;
    const animation = animate(
      element,
      { translateY: "100%" },
      {
        type: "tween",
        ease: "linear",
        duration: Math.random() * 2 + 3,
        delay: Math.random() * 2,
        repeat: Infinity,
        repeatType: "loop",
        onComplete: () => {
          setY(0);
          controls.start({ translateY: "100%" });
        },
      }
    );

    return () => {
      animation.stop();
    };
  }, [controls]);

  useEffect(() => {
    controls.start({
      translateY: y,
      transition: { delay },
    });
  }, [controls, delay, y]);

  return (
    <motion.div
      ref={ref}
      style={{
        left: Math.random() * window.innerWidth,
        position: "absolute",
        top: 0,
      }}
      dangerouslySetInnerHTML={{ __html: dropSVG }}
    />
  );
};

export default function CityInput(props) {
  const { onSubmit, zipCode, setZipCode, onReset } = props;
  const [showSun, setShowSun] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSun(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(zipCode);
  };

  const handleChange = (event) => {
    setZipCode(event.target.value);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen py-40 mx-auto rounded-md shadow-md transition-colors duration-2000 ${
        showSun ? "bg-yellow-200" : "bg-indigo-200"
      }`}
    >
      <form onSubmit={handleSubmit} className="z-10 mb-10 space-y-4">
        <div>
          <label
            htmlFor="zipCode"
            className="block mb-2 text-xl font-bold text-black"
          >
            Enter Zip Code:
          </label>
          <input
            id="zipCode"
            name="zipCode"
            className="w-full px-4 py-2 text-black border-2 rounded-md focus:outline-none"
            type="text"
            required
            value={zipCode}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-xl font-bold text-white bg-green-500 rounded-md focus:outline-none"
        >
          Find
        </button>
      </form>
      {!showSun &&
        Array.from({ length: 50 }).map((_, i) => (
          <Raindrop key={i} delay={i * 0.05} />
        ))}
      {showSun && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "-50%" }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-0 mx-auto"
          dangerouslySetInnerHTML={{ __html: sunSVG }}
        />
      )}
    </div>
  );
}
