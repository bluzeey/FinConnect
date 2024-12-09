"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import { ProfileProps } from "@/lib/definitions";

export default function UserProfile({
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

      {/* <Card>
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
      </Card> */}

      {/* <Card>
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
      </Card> */}

      {/* <Card>
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
      </Card> */}
    </>
  );
}
