"use client";

import { useRef } from "react";
import BriefBuilder from "./components/BriefBuilder";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";

export default function Home() {
  const briefRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection onBriefClick={() => briefRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })} />
      <section ref={briefRef} id="brief" className="intel-bg px-0 py-16">
        <BriefBuilder />
      </section>
      <Footer />
    </main>
  );
}