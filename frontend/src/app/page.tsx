import React from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";
import Features from "@/components/features";
import HowItWorks from "@/components/howItWorks";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col w-full min-h-screen items-center justify-center">
      <Header />
      <main className="flex-1 items-center justify-center">
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
