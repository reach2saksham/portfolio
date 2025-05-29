import Image from "next/image";
import Bento from "./components/Bento";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Testing from "./components/Testing";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
// import InfiniteSlider from "./components/InfiniteSlider";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col mx-auto max-w-screen-2xl">
      <Navbar/>
      <Hero/>
      {/* <InfiniteSlider/> */}
      <Bento/>
      <Projects/>
      {/* <Card/> */}

      {/* <Testing/> */}
      <Footer/>
    </main>
  );
}