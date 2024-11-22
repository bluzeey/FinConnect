"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  Edit,
  Bell,
  Search,
} from "lucide-react";

// Mock user data
const userData = {
  id: "1",
  name: "John Doe",
  role: "expert", // or "user"
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  profilePicture: "/placeholder-avatar.jpg",
  // Expert-specific fields
  title: "Certified Financial Planner (CFP)",
  expertise: [
    "Investment Strategies",
    "Retirement Planning",
    "Tax Optimization",
  ],
  experience: [
    {
      role: "Senior Financial Advisor",
      company: "Global Wealth Management Inc.",
      duration: "2015 - Present",
    },
    {
      role: "Financial Analyst",
      company: "Investment Strategies LLC",
      duration: "2010 - 2015",
    },
  ],
  certifications: [
    "Certified Financial Planner (CFP)",
    "Chartered Financial Analyst (CFA)",
  ],
  availability: "Mon-Fri, 9 AM - 5 PM ET",
  pricing: {
    hourlyRate: "$250 - $350",
    projectBased: "Custom quotes based on project scope",
  },
  // User-specific fields
  summary:
    "Seeking financial advice for retirement planning and investment strategies.",
  savedExperts: ["Jane Smith", "Mike Johnson"],
  pastConsultations: [
    "Retirement Planning Session",
    "Investment Portfolio Review",
  ],
  searchPreferences: ["Retirement Planning", "Tax Optimization"],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(userData);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
    console.log("Saving updated user data:", editedUser);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
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
    </div>
  );
}

interface ProfileProps {
  userData: typeof userData;
  isEditing: boolean;
  editedUser: typeof userData;
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
                  name="hourlyRate"
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
                  name="projectBased"
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

function UserProfile({
  userData,
  isEditing,
  editedUser,
  handleInputChange,
}: ProfileProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              name="summary"
              value={editedUser.summary}
              onChange={handleInputChange}
              rows={4}
            />
          ) : (
            <p>{userData.summary}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saved Experts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {userData.savedExperts.map((expert, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{expert}</span>
                <Button variant="ghost" size="sm">
                  View Profile
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Past Consultations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {userData.pastConsultations.map((consultation, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{consultation}</span>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {userData.searchPreferences.map((preference, index) => (
              <Badge key={index} variant="secondary">
                {preference}
              </Badge>
            ))}
          </div>
          <Button className="mt-4" variant="outline">
            <Search className="mr-2 h-4 w-4" /> Start New Search
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
