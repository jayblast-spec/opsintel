"use client";

import { useRef } from "react";
import HeroSection from "./components/HeroSection";
import BriefBuilder from "./components/BriefBuilder";
import Footer from "./components/Footer";

export default function Home() {
  const briefRef = useRef<HTMLDivElement>(null);

  function scrollToBrief() {
    briefRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <HeroSection onBriefClick={scrollToBrief} />
      <div ref={briefRef} className="scroll-mt-8 pt-16">
        <div className="mx-auto max-w-6xl px-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Generate your intelligence brief</h2>
          <p className="text-sm text-muted mt-1 font-mono">
            Describe your operations on the left. Your classified brief builds in real time on the right.
          </p>
        </div>
        <BriefBuilder />
      </div>
      <Footer />
    </main>
  );
}
