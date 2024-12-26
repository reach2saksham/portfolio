import Image from "next/image";
import Bento from "./components/Bento";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black container mx-auto">
      <Navbar/>
      <div className=" container mt-24 mx-auto">
      <Bento/>
      </div>
    </main>
  );
}