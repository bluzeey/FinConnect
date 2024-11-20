import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUp() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Create Your Account
        </h2>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <Card>
            <CardHeader>
              <CardTitle>For Businesses</CardTitle>
              <CardDescription>
                Find financial experts for your needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Sign Up as a Business</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Experts</CardTitle>
              <CardDescription>
                Showcase your expertise and connect with clients.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Sign Up as an Expert</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
