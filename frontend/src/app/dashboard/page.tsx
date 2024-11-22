import React from "react";
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

// Mock data for demonstration purposes
const user = {
  name: "John Doe",
  avatar: "/placeholder.svg",
};

const metrics = {
  connections: 15,
  consultations: 8,
  pendingRequests: 3,
};

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

const notifications = [
  { id: 1, content: "New message received", isRead: false },
  { id: 2, content: "Your quote was accepted", isRead: true },
  { id: 3, content: "Reminder: Upcoming consultation", isRead: false },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for larger screens */}
      <Sidebar activeTab="Dashboard" />
      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar for mobile */}
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
                <h2 className="text-2xl font-bold mb-4">Finder Service</h2>
                <NavItems />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <UserInfo />
              </div>
            </SheetContent>
          </Sheet>
        </header>

        {/* Dashboard content */}
        <ScrollArea className="flex-1 p-4 lg:p-8">
          <div className="space-y-8">
            <OverviewSection />
            <RecentActivitySection />
            <UserActionsSection />
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

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

function UserInfo() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-muted-foreground">View Profile</p>
      </div>
    </div>
  );
}

function OverviewSection() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">Welcome back, {user.name}!</h2>
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

function RecentActivitySection() {
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

function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
