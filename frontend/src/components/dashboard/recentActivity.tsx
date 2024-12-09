import React, { useEffect, useState } from "react";
import {
  Bell,
  Home,
  Search,
  MessageSquare,
  Star,
  User,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/sidebar";

export default function RecentActivitySection() {
  const recentActivities = [
    {
      id: 1,
      type: "message",
      content: "New message from Jane Smith",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "request",
      content: "Quote request from Tech Innovators Inc.",
      timestamp: "1 day ago",
    },
    {
      id: 3,
      type: "review",
      content: "New review from Global Traders Ltd.",
      timestamp: "3 days ago",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="p-4 hover:bg-muted/50">
                <div className="flex justify-between items-start">
                  <p>{activity.content}</p>
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
