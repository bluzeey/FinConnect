"use client";
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
import { useAuth } from "../../context/AuthContext";
import Menu from "@/components/dashboard/menu";
import RecentActivitySection from "@/components/dashboard/recentActivity"; // Import your AuthContext

interface User {
  username: string;
  email: string;
  role: string;
}

const metrics = {
  connections: 15,
  consultations: 8,
  pendingRequests: 3,
};

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user); // Retrieve user from context

  // Early return if user is not set
  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab="Dashboard" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden flex items-center justify-between p-4 border-b">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="py-4">
                <h2 className="text-2xl font-bold mb-4">FinConnect</h2>
                <NavItems />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <UserInfo user={user} />
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <ScrollArea className="flex-1 p-4 lg:p-8">
          <div className="space-y-8">
            <OverviewSection user={user} />
            <RecentActivitySection />
            <UserActionsSection />
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

function NavItems() {
  const navItems = [
    { icon: Home, label: "Dashboard" },
    { icon: Search, label: "Search" },
    { icon: FileText, label: "Quotes" },
    { icon: MessageSquare, label: "Messages" },
    { icon: Star, label: "Reviews" },
    { icon: User, label: "Profile" },
  ];

  return (
    <ul className="space-y-2">
      {navItems.map((item, index) => (
        <li key={index}>
          <Button variant="ghost" className="w-full justify-start">
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        </li>
      ))}
    </ul>
  );
}

function UserInfo({ user }: { user: User }) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={user.avatar} alt={user.username} />
        <AvatarFallback>{user.username}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{user.username}</p>
        <p className="text-xs text-muted-foreground">View Profile</p>
      </div>
    </div>
  );
}

function OverviewSection({ user }: { user: User }) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">
        Welcome back, {user.username}!
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Connections" value={metrics.connections} />
        <MetricCard title="Consultations" value={metrics.consultations} />
        <MetricCard title="Pending Requests" value={metrics.pendingRequests} />
      </div>
    </section>
  );
}

function MetricCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function UserActionsSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Button className="h-20">
          <Search className="mr-2 h-5 w-5" /> New Search
        </Button>
        <Button className="h-20">
          <FileText className="mr-2 h-5 w-5" /> Request Quote
        </Button>
        <Button className="h-20">
          <MessageSquare className="mr-2 h-5 w-5" /> Compose Message
        </Button>
      </div>
    </section>
  );
}

function NotificationsButton() {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Button variant="outline" size="icon" className="relative">
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
          {unreadCount}
        </Badge>
      )}
    </Button>
  );
}

export default Dashboard;
