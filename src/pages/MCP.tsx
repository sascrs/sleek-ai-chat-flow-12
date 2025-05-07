
import React, { useState } from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { Search, Filter, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type ServerCardProps = {
  title: string;
  description: string;
  type: 'framework' | 'reference' | 'third-party' | 'community';
  tags: string[];
  rating: number;
  details?: React.ReactNode;
};

const ServerCard: React.FC<ServerCardProps> = ({
  title,
  description,
  type,
  tags,
  rating,
}) => {
  const getBadgeColor = () => {
    switch(type) {
      case 'framework': return 'bg-gradient-to-r from-purple-500 to-blue-500';
      case 'reference': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'third-party': return 'bg-gradient-to-r from-pink-500 to-purple-500';
      case 'community': return 'bg-gradient-to-r from-cyan-500 to-blue-500';
      default: return 'bg-gradient-to-r from-purple-500 to-blue-500';
    }
  };

  return (
    <Card className="overflow-hidden bg-[#171B26] border-[#282D3A]">
      <div className="relative h-16">
        <div className={`absolute top-0 right-0 w-40 h-full ${getBadgeColor()} rounded-bl-full`}></div>
        <div className="absolute top-3 right-5 text-white text-xs font-medium">{type}</div>
        <h3 className="text-xl font-semibold p-4 text-white">{title}</h3>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-gray-300 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="bg-[#1F2537] text-white border-[#2A3148]">
              {tag}
            </Badge>
          ))}
          {tags.length > 0 && <span className="text-xs text-gray-400 self-center">+1 more</span>}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-white font-medium">{rating.toFixed(1)}</span>
          </div>
          <Button variant="link" className="text-purple-400 p-0 h-auto">Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const MCP = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const servers = [
    {
      title: "FastMCP",
      description: "A TypeScript framework for building MCP servers quickly and efficiently",
      type: "framework" as const,
      tags: ["Framework", "TypeScript", "Development"],
      rating: 4.9,
    },
    {
      title: "EverArt",
      description: "AI image generation using various models",
      type: "reference" as const,
      tags: ["AI", "Image Generation", "Models"],
      rating: 4.8,
    },
    {
      title: "Apify",
      description: "Actors MCP Server: Use 3,000+ pre-built cloud tools to extract data from websites, e-commerce, social media",
      type: "third-party" as const,
      tags: ["Data Extraction", "Web Scraping", "Automation"],
      rating: 4.8,
    },
    {
      title: "AWS KB Retrieval",
      description: "Retrieval from AWS Knowledge Base using Bedrock Agent Runtime",
      type: "reference" as const,
      tags: ["AWS", "AI", "Knowledge Base"],
      rating: 4.7,
    },
    {
      title: "Everything",
      description: "Reference / test server with prompts, resources, and tools",
      type: "reference" as const,
      tags: ["Testing", "Tools", "Prompts"],
      rating: 4.6,
    },
    {
      title: "21st.dev Magic",
      description: "Create crafted UI components inspired by the best 21st.dev design engineers",
      type: "third-party" as const,
      tags: ["UI", "Design", "Components"],
      rating: 4.6,
    },
    {
      title: "Brave Search",
      description: "Web and local search using Brave's Search API",
      type: "reference" as const,
      tags: ["Search", "Web", "API"],
      rating: 4.5,
    },
    {
      title: "Fetch",
      description: "Web content fetching and conversion for efficient LLM usage",
      type: "reference" as const,
      tags: ["Web", "Content", "Fetching"],
      rating: 4.5,
    },
    {
      title: "browser-use",
      description: "browser-use MCP server with dockerized playwright + chromium + vnc. supports stdio & resumable http.",
      type: "community" as const,
      tags: ["Browser", "Automation", "Docker"],
      rating: 4.3,
    },
    {
      title: "Discord Bot",
      description: "A MCP server to connect to Discord guilds through a bot and read and write messages in channels",
      type: "community" as const,
      tags: ["Discord", "Bot", "Communication"],
      rating: 4.2,
    },
  ];

  const filteredServers = activeTab === "all" 
    ? servers 
    : servers.filter(server => {
        if (activeTab === "reference") return server.type === "reference";
        if (activeTab === "third-party") return server.type === "third-party";
        if (activeTab === "community") return server.type === "community";
        if (activeTab === "frameworks") return server.type === "framework";
        if (activeTab === "resources") return false; // Not implemented in demo
        return true;
      });

  return (
    <ChatLayout>
      <div className="min-h-screen bg-[#111827] text-white">
        <div className="container mx-auto max-w-7xl p-4 md:p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">MCP Servers</h1>
            <p className="text-gray-400 max-w-3xl">
              Explore the Model Context Protocol (MCP) server ecosystem. Browse reference
              implementations, third-party integrations, community servers, and frameworks for building AI-
              powered applications.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search MCP servers..."
                className="w-full bg-[#1F2537] border border-[#282D3A] rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative w-44">
                <select className="w-full appearance-none bg-[#1F2537] border border-[#282D3A] rounded-lg py-2 px-4 text-white pr-8 focus:outline-none">
                  <option>Highest Rated</option>
                  <option>Newest</option>
                  <option>Most Used</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <Button variant="outline" className="bg-[#1F2537] border-[#282D3A] text-white">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          <Separator className="border-[#282D3A]" />
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent flex gap-1 overflow-x-auto pb-2">
              <TabsTrigger 
                value="all" 
                className={cn(
                  "rounded-md px-4 py-2",
                  activeTab === "all" 
                    ? "bg-purple-600 text-white" 
                    : "bg-transparent text-white hover:bg-[#282D3A]"
                )}
              >
                All Servers
              </TabsTrigger>
              <TabsTrigger 
                value="reference" 
                className={cn(
                  "rounded-md px-4 py-2",
                  activeTab === "reference" 
                    ? "bg-purple-600 text-white" 
                    : "bg-transparent text-white hover:bg-[#282D3A]"
                )}
              >
                Reference Servers
              </TabsTrigger>
              <TabsTrigger 
                value="third-party" 
                className={cn(
                  "rounded-md px-4 py-2",
                  activeTab === "third-party" 
                    ? "bg-purple-600 text-white" 
                    : "bg-transparent text-white hover:bg-[#282D3A]"
                )}
              >
                Third-Party Servers
              </TabsTrigger>
              <TabsTrigger 
                value="community" 
                className={cn(
                  "rounded-md px-4 py-2",
                  activeTab === "community" 
                    ? "bg-purple-600 text-white" 
                    : "bg-transparent text-white hover:bg-[#282D3A]"
                )}
              >
                Community Servers
              </TabsTrigger>
              <TabsTrigger 
                value="frameworks" 
                className={cn(
                  "rounded-md px-4 py-2",
                  activeTab === "frameworks" 
                    ? "bg-purple-600 text-white" 
                    : "bg-transparent text-white hover:bg-[#282D3A]"
                )}
              >
                Frameworks
              </TabsTrigger>
              <TabsTrigger 
                value="resources" 
                className={cn(
                  "rounded-md px-4 py-2",
                  activeTab === "resources" 
                    ? "bg-purple-600 text-white" 
                    : "bg-transparent text-white hover:bg-[#282D3A]"
                )}
              >
                Resources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServers.map((server, index) => (
                  <ServerCard
                    key={index}
                    title={server.title}
                    description={server.description}
                    type={server.type}
                    tags={server.tags}
                    rating={server.rating}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ChatLayout>
  );
};

export default MCP;
