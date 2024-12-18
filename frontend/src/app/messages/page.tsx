"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MoreVertical, Paperclip, Send } from "lucide-react";
import Sidebar from "@/components/sidebar";

type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
};

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
};

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "/placeholder.svg",
    lastMessage: "Hey, how are you doing?",
    timestamp: "10:30 AM",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "/placeholder.svg",
    lastMessage: "Can we schedule a meeting?",
    timestamp: "Yesterday",
    unreadCount: 0,
  },
  // Add more conversations as needed
];

const messages: Message[] = [
  {
    id: "1",
    sender: "Alice Johnson",
    content: "Hey, how are you doing?",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    sender: "You",
    content: "I'm doing great, thanks for asking! How about you?",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: "3",
    sender: "Alice Johnson",
    content: "I'm good too. Do you have time for a quick call later today?",
    timestamp: "10:33 AM",
    isOwn: false,
  },
  // Add more messages as needed
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab="Messages" />
      <div className="flex w-full h-screen bg-gray-100">
        {/* Left Column - Conversations List */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-8"
                placeholder="Search conversations..."
                type="search"
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
                  selectedConversation?.id === conversation.id
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={conversation.avatar}
                    alt={conversation.name}
                  />
                  <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Right Column - Chat Interface */}
        <div className="hidden md:flex md:w-2/3 lg:w-3/4 flex-col">
          {selectedConversation ? (
            <>
              <div className="bg-white p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedConversation.avatar}
                      alt={selectedConversation.name}
                    />
                    <AvatarFallback>
                      {selectedConversation.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="ml-4 font-semibold">
                    {selectedConversation.name}
                  </h2>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
              <ScrollArea className="flex-1 p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isOwn ? "justify-end" : "justify-start"
                    } mb-4`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.isOwn ? "bg-blue-500 text-white" : "bg-white"
                      }`}
                    >
                      <p>{message.content}</p>
                      <span className="text-xs mt-1 block text-right">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="bg-white p-4 border-t">
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    className="flex-1"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button className="ml-2" onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">
                Select a conversation to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
