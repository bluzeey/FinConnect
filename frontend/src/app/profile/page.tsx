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
import UserProfile from "@/components/profile/userProfile";
import ExpertProfile from "@/components/profile/expertProfile";

const BASE_URL = "http://localhost:8000/auth/user/"; 

// Base URL for your API
export default function ProfilePage() {
  const { authTokens } = useAuth(); 
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}profile/`, {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`, 
          },
        });
        setUserData(response.data);
        setEditedUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (authTokens?.access) { 
      fetchUserData();
    }
  }, [authTokens]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`${BASE_URL}update-profile/`, editedUser, {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`, // Use the access token
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
            Authorization: `Bearer ${authTokens?.access}`, 
          },
        });
        alert("Account deleted successfully!");
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
            <AvatarFallback>{userData.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">{userData.username}</h1>
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
