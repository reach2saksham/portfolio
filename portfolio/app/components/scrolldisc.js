import { useEffect, useState, useRef } from "react";

export default function App() {
  const [isFixed, setIsFixed] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom || 0;
      if (heroBottom <= 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div
        ref={heroRef}
        className="h-screen bg-blue-300 flex items-center justify-center"
      >
        <h1 className="text-4xl">Hero Section</h1>
      </div>

      <div className={`w-full ${isFixed ? "fixed top-0" : "relative"} bg-red-500`}>
        <p className="p-4 text-white">I change position on scroll!</p>
      </div>

      <div className="h-[200vh] bg-gray-100">
        <p className="p-4">Scroll down...</p>
      </div>
    </div>
  );
}
