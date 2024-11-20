import React from "react";

import { Filter, MessageSquare, Star, Users } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Features
        </h2>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex items-start space-x-4">
            <Filter className="mt-1 h-6 w-6" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Personalized search filters</h3>
              <p className="text-muted-foreground">
                Find the perfect match for your specific needs.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Users className="mt-1 h-6 w-6" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">AI recommendations</h3>
              <p className="text-muted-foreground">
                Get intelligent suggestions based on your requirements.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <MessageSquare className="mt-1 h-6 w-6" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Secure messaging system</h3>
              <p className="text-muted-foreground">
                Communicate safely with potential hires.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Star className="mt-1 h-6 w-6" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Trusted reviews and ratings</h3>
              <p className="text-muted-foreground">
                Make informed decisions based on past performances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
