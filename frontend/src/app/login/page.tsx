import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function LoginSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Login
        </h2>
        <Tabs defaultValue="business" className="w-full max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="expert">Expert</TabsTrigger>
          </TabsList>
          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Login as a Business</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <label htmlFor="email">Email</label>
                  <Input id="email" type="email" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="password">Password</label>
                  <Input id="password" type="password" />
                </div>
                <div className="flex justify-between">
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </CardContent>
              <CardContent>
                <Button className="w-full">Login as a Business</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="expert">
            <Card>
              <CardHeader>
                <CardTitle>Login as an Expert</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <label htmlFor="expert-email">Email</label>
                  <Input id="expert-email" type="email" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="expert-password">Password</label>
                  <Input id="expert-password" type="password" />
                </div>
                <div className="flex justify-between">
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </CardContent>
              <CardContent>
                <Button className="w-full">Login as an Expert</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="#" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
