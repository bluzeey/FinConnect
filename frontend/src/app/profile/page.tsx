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

// Base URL for your API
const BASE_URL = "http://localhost:8000/auth/user/";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}profile/`, {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with the actual token
          },
        });
        setUserData(response.data);
        setEditedUser(response.data); // Set the initial user data for editing
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`${BASE_URL}update-profile/`, editedUser, {
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual token
        },
      });
      setIsEditing(false);
      alert("Profile updated successfully!");
      setUserData(editedUser); // Update the user data in state
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`${BASE_URL}delete-account/`, {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual token
          },
        });
        alert("Account deleted successfully!");
        // Redirect or perform any other necessary action after deletion
      } catch (error) {
        console.error("Error deleting user account:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab="Profile" />
      <main className="flex-1 flex flex-col p-4 space-y-8 overflow-hidden">
        <header className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={userData.profilePicture} alt={userData.name} />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">{userData.name}</h1>
            {userData.role === "expert" && (
              <p className="text-xl text-muted-foreground">{userData.title}</p>
            )}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
              {userData.role === "expert" &&
                userData.expertise.map((item, index) => (
                  <Badge key={index} variant="secondary">
                    {item}
                  </Badge>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={isEditing ? handleSave : handleEdit}>
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
            <Button variant="outline" onClick={handleDelete}>
              Delete Account
            </Button>
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </Button>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>
                  {isEditing ? (
                    <Input
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    userData.email
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    userData.phone
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>
                  {isEditing ? (
                    <Input
                      name="location"
                      value={editedUser.location}
                      onChange={handleInputChange}
                    />
                  ) : (
                    userData.location
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {userData.role === "expert" ? (
          <ExpertProfile
            userData={userData}
            isEditing={isEditing}
            editedUser={editedUser}
            handleInputChange={handleInputChange}
          />
        ) : (
          <UserProfile
            userData={userData}
            isEditing={isEditing}
            editedUser={editedUser}
            handleInputChange={handleInputChange}
          />
        )}

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>You have 3 new messages</span>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" /> View Messages
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

interface ProfileProps {
  userData: any; // Update this to the correct type as needed
  isEditing: boolean;
  editedUser: any; // Update this to the correct type as needed
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function ExpertProfile({
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
