import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { MenuShowcase } from "@/components/sections/MenuShowcase";
import { MenuCategories } from "@/components/sections/MenuCategories";
import { Specials } from "@/components/sections/Specials";
import { ChefSignature } from "@/components/sections/ChefSignature";
import { LiveKitchen } from "@/components/sections/LiveKitchen";
import { LiveExperience } from "@/components/sections/LiveExperience";
import { FoodFinder } from "@/components/sections/FoodFinder";
import { CustomerTimeline } from "@/components/sections/CustomerTimeline";
import { WhyPalagaram } from "@/components/sections/WhyPalagaram";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { Reservation } from "@/components/sections/Reservation";
import { Footer } from "@/components/sections/Footer";
import { IntroAnimation } from "@/components/IntroAnimation";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={() => setIntroComplete(true)} />}
      <div
        className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden"
        style={{ visibility: introComplete ? "visible" : "hidden" }}
      >
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <MenuShowcase />
          <MenuCategories />
          <Specials />
          <ChefSignature />
          <LiveKitchen />
          <LiveExperience />
          <FoodFinder />
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
