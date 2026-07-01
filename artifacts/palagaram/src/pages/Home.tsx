import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { DailyFoodCombos } from "@/components/sections/DailyFoodCombos";
import { About } from "@/components/sections/About";
import { MenuShowcase } from "@/components/sections/MenuShowcase";
import { MenuCategories } from "@/components/sections/MenuCategories";
import { Specials } from "@/components/sections/Specials";
import { ChefSignature } from "@/components/sections/ChefSignature";
import { CustomerTimeline } from "@/components/sections/CustomerTimeline";
import { WhyPalagaram } from "@/components/sections/WhyPalagaram";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { Reservation } from "@/components/sections/Reservation";
import { Footer } from "@/components/sections/Footer";
import { IntroAnimation } from "@/components/IntroAnimation";

const INTRO_KEY = "palagaram_intro_seen";

export default function Home() {
  const alreadySeen = sessionStorage.getItem(INTRO_KEY) === "1";
  const [introComplete, setIntroComplete] = useState(alreadySeen);

  function handleIntroComplete() {
    sessionStorage.setItem(INTRO_KEY, "1");
    setIntroComplete(true);
  }

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      <div
        className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden"
        style={{ visibility: introComplete ? "visible" : "hidden" }}
      >
        <Navbar />
        <main className="flex-1">
          <Hero />
          <DailyFoodCombos />
          <About />
          <MenuShowcase />
          <MenuCategories />
          <Specials />
          <ChefSignature />
          <CustomerTimeline />
          <WhyPalagaram />
          <Testimonials />
          <InstagramSection />
          <Reservation />
        </main>
        <Footer />
      </div>
    </>
  );
}
