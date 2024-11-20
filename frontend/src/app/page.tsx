import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Filter,
  MessageSquare,
  Star,
  Users,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/hero";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";
import Features from "@/components/features";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col w-full min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Image src="/placeholder.svg" alt="Logo" width={32} height={32} />
              <span className="hidden font-bold sm:inline-block">
                Finder Service
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
        <HowItWorksSection />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          How It Works
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Search className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold">Search and Filter</h3>
            <p className="text-muted-foreground">
              Find experts by location, expertise, or ratings.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <MessageSquare className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold">Request a Quote</h3>
            <p className="text-muted-foreground">
              Submit your requirements and get responses.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Star className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold">Hire and Review</h3>
            <p className="text-muted-foreground">
              Choose the best professional for your needs.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button>Learn More</Button>
        </div>
      </div>
    </section>
  );
}
