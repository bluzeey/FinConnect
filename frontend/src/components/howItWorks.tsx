import { Button } from "@/components/ui/button";
import { Search, Filter, MessageSquare, Star } from "lucide-react";

export default function HowItWorks() {
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
