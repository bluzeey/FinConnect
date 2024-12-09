"use client";

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Import your AuthContext
import Link from "next/link";
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
import { useRouter } from "next/navigation"; // Import Next.js router

export default function Login() {
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPassword, setBusinessPassword] = useState("");
  const [expertEmail, setExpertEmail] = useState("");
  const [expertPassword, setExpertPassword] = useState("");

  const { loginUser } = useAuth();
  const router = useRouter();

  const handleLogin = async (userType: string) => {
    const email = userType === "business" ? businessEmail : expertEmail;
    const password =
      userType === "business" ? businessPassword : expertPassword;

    try {
      // Use the loginUser function from AuthContext
      await loginUser({ email, password });

      // Redirect to dashboard after successful login
      router.push("/dashboard"); // Adjust the path as needed
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="h-[calc(100vh-var(--navbar-height))] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
        <Tabs defaultValue="business" className="w-full max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="expert">Expert</TabsTrigger>
          </TabsList>

          {/* Business Login */}
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
                  <label htmlFor="business-email">Email</label>
                  <Input
                    id="business-email"
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="business-password">Password</label>
                  <Input
                    id="business-password"
                    type="password"
                    value={businessPassword}
                    onChange={(e) => setBusinessPassword(e.target.value)}
                    placeholder="Password"
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

          {/* Expert Login */}
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
                    placeholder="Email address"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="expert-password">Password</label>
                  <Input
                    id="expert-password"
                    type="password"
                    value={expertPassword}
                    onChange={(e) => setExpertPassword(e.target.value)}
                    placeholder="Password"
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
    </div>
  );
}
