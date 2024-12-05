"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import Next.js router
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
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPassword, setBusinessPassword] = useState("");
  const [expertEmail, setExpertEmail] = useState("");
  const [expertPassword, setExpertPassword] = useState("");

  const API_BASE_URL = "http://localhost:8000/auth"; // Update with your actual backend URL
  const router = useRouter(); // Initialize the router

  const handleLogin = async (userType: string) => {
    const email = userType === "business" ? businessEmail : expertEmail;
    const password =
      userType === "business" ? businessPassword : expertPassword;

    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, {
        email: email,
        password: password,
        userType: userType,
      });

      if (response.status === 200) {
        // Assume the response contains access_token and user_details
        const { access_token, user_details } = response.data;

        // Store user data
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user_details", JSON.stringify(user_details));

        // Redirect to the dashboard
        router.push("/dashboard"); // Adjust the path as needed
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      alert("Invalid Credentials");
    }
  };

  return (
    <section className="w-screen h-screen flex items-center justify-center bg-muted">
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
                  <Input
                    id="email"
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="password">Password</label>
                  <Input
                    id="password"
                    type="password"
                    value={businessPassword}
                    onChange={(e) => setBusinessPassword(e.target.value)}
                  />
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
                <Button
                  className="w-full"
                  onClick={() => handleLogin("business")}
                >
                  Login as a Business
                </Button>
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
                  <Input
                    id="expert-email"
                    type="email"
                    value={expertEmail}
                    onChange={(e) => setExpertEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="expert-password">Password</label>
                  <Input
                    id="expert-password"
                    type="password"
                    value={expertPassword}
                    onChange={(e) => setExpertPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={() => handleLogin("expert")}
                >
                  Login as an Expert
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
