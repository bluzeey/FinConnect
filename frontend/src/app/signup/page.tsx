"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Button component
import { Input } from "@/components/ui/input"; // Input component
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext"; // Import your AuthContext

export default function SignUp() {
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPassword, setBusinessPassword] = useState("");
  const [businessUsername, setBusinessUsername] = useState("");
  const [expertEmail, setExpertEmail] = useState("");
  const [expertPassword, setExpertPassword] = useState("");
  const [expertUsername, setExpertUsername] = useState("");
  const { registerUser } = useAuth(); // Extracting registerUser from context

  const handleSignUp = async (userType: string) => {
    const email = userType === "business" ? businessEmail : expertEmail;
    const password =
      userType === "business" ? businessPassword : expertPassword;
    const username =
      userType === "business" ? businessUsername : expertUsername;

    if (!email || !password || !username) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const result = await registerUser({
        username,
        email,
        password,
        password2: password, // Assuming this is your password confirmation field
      });

      if (result.success) {
        alert("Account created successfully!"); // Display success message
        // Optionally, redirect to a different page
      } else {
        throw new Error(result.errors?.email || "Registration failed"); // Handle errors from registerUser
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(
        "Failed to create account: " + (error.message || "Unexpected error")
      );
    }
  };

  return (
    <section className="w-screen h-screen flex items-center justify-center bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Sign Up
        </h2>
        <Tabs defaultValue="business" className="w-full max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="expert">Expert</TabsTrigger>
          </TabsList>
          {/* Business Sign Up */}
          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up as a Business</CardTitle>
                <CardDescription>
                  Find financial experts for your needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <label htmlFor="business-username">Username</label>
                  <Input
                    id="business-username"
                    type="text"
                    value={businessUsername}
                    onChange={(e) => setBusinessUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="business-email">Email</label>
                  <Input
                    id="business-email"
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="business-password">Password</label>
                  <Input
                    id="business-password"
                    type="password"
                    value={businessPassword}
                    onChange={(e) => setBusinessPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={() => handleSignUp("business")}
                >
                  Sign Up as a Business
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Expert Sign Up */}
          <TabsContent value="expert">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up as an Expert</CardTitle>
                <CardDescription>
                  Showcase your expertise and connect with clients.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <label htmlFor="expert-username">Username</label>
                  <Input
                    id="expert-username"
                    type="text"
                    value={expertUsername}
                    onChange={(e) => setExpertUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="expert-email">Email</label>
                  <Input
                    id="expert-email"
                    type="email"
                    value={expertEmail}
                    onChange={(e) => setExpertEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="expert-password">Password</label>
                  <Input
                    id="expert-password"
                    type="password"
                    value={expertPassword}
                    onChange={(e) => setExpertPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={() => handleSignUp("expert")}
                >
                  Sign Up as an Expert
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
