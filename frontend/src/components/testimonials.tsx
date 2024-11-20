import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Finder Service helped us find the perfect CFO for our startup. Highly recommended!",
      author: "Jane Doe",
      role: "CEO, Tech Innovators Inc.",
      avatar: "/placeholder.svg",
    },
    {
      quote:
        "The platform's AI recommendations were spot-on. We found an AR specialist within days.",
      author: "John Smith",
      role: "Finance Director, Global Traders Ltd.",
      avatar: "/placeholder.svg",
    },
    {
      quote:
        "As an accountant, I've connected with amazing clients through Finder Service.",
      author: "Emily Brown",
      role: "Certified Public Accountant",
      avatar: "/placeholder.svg",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Image
                    alt={testimonial.author}
                    className="rounded-full"
                    height="40"
                    src={testimonial.avatar}
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                  <div>
                    <CardTitle>{testimonial.author}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
