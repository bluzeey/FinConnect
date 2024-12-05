"use client";
import React, { useState } from "react";
import axios from "axios";
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

export default function SignUp() {
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPassword, setBusinessPassword] = useState("");
  const [expertEmail, setExpertEmail] = useState("");
  const [expertPassword, setExpertPassword] = useState("");

  const API_BASE_URL = "http://localhost:8000/auth"; // Replace with your backend URL

  const generateUsername = (email: string) => {
    // Extract the part before '@' in the email
    return email.split("@")[0];
  };

  const handleSignUp = async (userType: string) => {
    const email = userType === "business" ? businessEmail : expertEmail;
    const password =
      userType === "business" ? businessPassword : expertPassword;

    if (!email || !password) {
      alert("Please fill in all the fields");
      return;
    }

    // Generate a username based on email
    const username = generateUsername(email);

    try {
      const response = await axios.post(`${API_BASE_URL}/signup/`, {
        username: username, // Include the dynamically generated username
        email: email,
        password: password,
        role: userType, // Pass the user type as role
      });

      console.log("User registered successfully:", response.data);
      alert("Account created successfully!");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to create account");
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
