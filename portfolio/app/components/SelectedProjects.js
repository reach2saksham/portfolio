import React from "react";
import { useRouter } from "next/navigation";
import ExpandedCard from "./ExpandedCard";

const SelectedProjects = () => {
  const router = useRouter();
  const handleCardClick = (docsLink) => {
    window.open(docsLink, "_blank");
  };
  return (
    <div id="projects" className="pt-12 select-none">
      <div className="z-30 relative flex justify-center select-none font-mono font-medium text-sm text-white/60 tracking-wider">
        CASE STUDIES
      </div>
      <div className="z-30 relative flex gap-4 justify-center select-none py-4 font-ssromandisplay text-4xl sm:text-6xl font-medium">
        <span className="text-white drop-shadow-[0_2px_4px_#4C4C4C] md:drop-shadow-[0_4px_8px_#4C4C4C]">Curated</span>
        <span className="bg-gradient-to-b from-[#DE5971] to-[#FF00C1] bg-clip-text text-transparent">
          Work
        </span>
      </div>
      <ExpandedCard
        topInfo="01 | PRODUCT DESIGNER"
        status = "Coming Soon"
        coverImage="./design/telegram-nodes/cardcover2.avif"
        mainHeading="Nodes"
        companyName="@Telegram"
        description="A ground-up product feature introducing multi-workspace “Nodes” in Telegram, enabling Discord-like servers with roles, admin controls, voice/video spaces, and separate identities, designed seamlessly for both iOS and Android with full day & night theme support."
        // bulletPoints={[
        //   "Centralized platform to track all client projects",
        //   "Real-time visibility into employee assignments and progress",
        //   "Clear mapping between projects and team members",
        // ]}
        // bulletColor="#2FF9EB"
        readTime="16 MIN"
        duration="DECEMBER 2025"
        docsLink="/design/telegram-nodes"
        onCardClick={() => handleCardClick("/design/telegram-nodes")}
      />
    </div>
  );
};

export default SelectedProjects;
