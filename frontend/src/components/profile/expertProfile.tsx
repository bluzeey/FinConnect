"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Importing axios
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MapPin, MessageSquare, Phone, Star, Bell } from "lucide-react";
import Sidebar from "@/components/sidebar";
import { useAuth } from "@/context/AuthContext";
import {userData,ProfileProps} from "@/lib/definitions";


export default function ExpertProfile({
    userData,
    isEditing,
    editedUser,
    handleInputChange,
  }: ProfileProps) {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="experience">
              <TabsList>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>
              <TabsContent value="experience">
                <ul className="space-y-4">
                  {userData.experience.map((exp, index) => (
                    <li key={index}>
                      <h3 className="font-semibold">{exp.role}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company} | {exp.duration}
                      </p>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="certifications">
                <ul className="list-disc list-inside">
                  {userData.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader>
            <CardTitle>Availability and Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Availability</Label>
                {isEditing ? (
                  <Input
                    name="availability"
                    value={editedUser.availability}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{userData.availability}</p>
                )}
              </div>
              <div>
                <Label>Hourly Rate</Label>
                {isEditing ? (
                  <Input
                    name="pricing.hourlyRate"
                    value={editedUser.pricing.hourlyRate}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{userData.pricing.hourlyRate}</p>
                )}
              </div>
              <div>
                <Label>Project-Based Pricing</Label>
                {isEditing ? (
                  <Input
                    name="pricing.projectBased"
                    value={editedUser.pricing.projectBased}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{userData.pricing.projectBased}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader>
            <CardTitle>Reviews and Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-lg font-semibold">4.8 out of 5</span>
              <span className="text-sm text-muted-foreground">(24 reviews)</span>
            </div>
            <Button variant="outline">View All Reviews</Button>
          </CardContent>
        </Card>
      </>
    );
  }
  