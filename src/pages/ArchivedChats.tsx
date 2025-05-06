
import React from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  Archive, 
  MessageSquare, 
  Search, 
  MoreVertical, 
  Trash2, 
  RefreshCw, 
  FolderOpen 
} from 'lucide-react';

const ArchivedChats = () => {
  // Sample archived chats data
  const archivedChats = [
    { 
      id: 1, 
      title: 'AI Image Generation Techniques', 
      lastMessage: 'Here are some advanced techniques for image generation using GANs...', 
      timestamp: '3 weeks ago', 
      messages: 24 
    },
    { 
      id: 2, 
      title: 'Project Planning Discussion', 
      lastMessage: 'I recommend breaking down the development into these phases...', 
      timestamp: '1 month ago', 
      messages: 36 
    },
    { 
      id: 3, 
      title: 'Database Schema Design', 
      lastMessage: 'The normalized schema should include these relationships...', 
      timestamp: '2 months ago', 
      messages: 15 
    },
    { 
      id: 4, 
      title: 'Machine Learning Model Comparison', 
      lastMessage: 'When comparing these models, consider the following metrics...', 
      timestamp: '2 months ago', 
      messages: 28 
    },
    { 
      id: 5, 
      title: 'UI/UX Design Feedback', 
      lastMessage: 'The interface could be improved by simplifying these components...', 
      timestamp: '3 months ago', 
      messages: 42 
    },
  ];
  
  return (
    <ChatLayout>
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold font-space-grotesk">Archived Chats</h1>
            <p className="text-muted-foreground">Access your previously archived conversations</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search archives..."
              className="pl-9 bg-background/70 shadow-inner"
            />
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border/40 flex justify-between items-center">
            <div className="flex items-center">
              <Archive className="h-5 w-5 mr-2 text-muted-foreground" />
              <h2 className="font-semibold">Archived Conversations</h2>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <FolderOpen className="h-3.5 w-3.5 mr-1.5" />
                Restore All
              </Button>
              <Button variant="outline" size="sm" className="text-xs text-destructive border-destructive/30 hover:bg-destructive/10">
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Clear
              </Button>
            </div>
          </div>
          
          {archivedChats.length > 0 ? (
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="divide-y divide-border/40">
                {archivedChats.map((chat) => (
                  <div key={chat.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 p-2 rounded-md bg-primary/10 text-primary">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{chat.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {chat.lastMessage}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{chat.timestamp}</span>
                            <span className="mx-2">•</span>
                            <span>{chat.messages} messages</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Archive className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Archived Chats</h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                You haven't archived any conversations yet. Archived chats will appear here.
              </p>
              <Button variant="outline">
                Return to Chats
              </Button>
            </div>
          )}
        </div>
      </div>
    </ChatLayout>
  );
};

export default ArchivedChats;
