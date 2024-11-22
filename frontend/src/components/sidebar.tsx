import React from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  Search,
  FileText,
  MessageSquare,
  Star,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function Sidebar({ activeTab }) {
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: FileText, label: "Quotes", path: "/quotes" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: Star, label: "Reviews", path: "/reviews" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">Finder Service</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.path}>
                <Button
                  variant={item.label === activeTab ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <UserInfo />
      </div>
    </aside>
  );
}

function UserInfo() {
  const user = { name: "John Doe", avatar: "/placeholder.svg" };
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

export default Sidebar;
