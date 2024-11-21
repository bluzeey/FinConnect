import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/hero";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";
import Features from "@/components/features";
import HowItWorks from "@/components/howItWorks";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col w-full min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Image src="/placeholder.svg" alt="Logo" width={32} height={32} />
              <span className="hidden font-bold sm:inline-block">
                FinConnect
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#how-it-works">How It Works</Link>
              <Link href="#features">Features</Link>
              <Link href="#pricing">Pricing</Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                Login
              </Button>
              <Button variant="ghost" size="sm">
                Sign Up
              </Button>
              <Button size="sm">Get Started</Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
