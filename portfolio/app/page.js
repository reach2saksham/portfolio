import Image from "next/image";
import Bento from "./components/Bento";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Testing from "./components/Testing";
import Card from "./components/Card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col mx-auto max-w-screen-2xl">
      <Navbar/>
      <Bento/>
      <Projects/>
      {/* <Card/> */}

      {/* <Testing/> */}
    </main>
  );
}