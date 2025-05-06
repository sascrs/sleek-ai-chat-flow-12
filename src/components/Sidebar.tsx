
import React, { useState } from 'react';
import { 
  MessageSquare, 
  FileText, 
  Image, 
  Settings, 
  PlusCircle,
  ChevronLeft,
  Star,
  Crown,
  Search,
  Archive,
  Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useChat } from '@/hooks/useChat';
import { Logo } from './Logo';
import { Link, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { conversations, startNewConversation, currentConversation, setCurrentConversation } = useChat();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleNewChat = () => {
    startNewConversation();
    if (window.innerWidth < 768) {
      onClose();
    }
  };
  
  const filteredConversations = searchQuery 
    ? conversations.filter(conv => 
        (conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.messages.some(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    : conversations;
  
  const sidebarClass = isOpen 
    ? 'translate-x-0' 
    : '-translate-x-full md:translate-x-0';
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`fixed inset-y-0 left-0 w-72 z-40 transform transition-transform duration-300 ease-in-out ${sidebarClass} flex flex-col border-r bg-sidebar/70 backdrop-blur-md`}
      >
        <div className="flex items-center justify-between p-4">
          <Logo size="sm" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full hover:bg-sidebar-accent/70" 
            onClick={onClose}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4">
          <Button 
            className="w-full justify-start rounded-xl h-11 bg-gradient-to-r from-primary/95 to-primary/85 hover:from-primary hover:to-primary/90 shadow-lg hover:shadow-primary/25 transition-all btn-3d" 
            onClick={handleNewChat}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
        
        <div className="px-4 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input 
              placeholder="Search chats..." 
              className="pl-8 h-9 bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1 px-3">
          {filteredConversations.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-medium mb-2 text-sidebar-foreground/60 px-2">Recent Conversations</h4>
              <div className="space-y-1">
                {filteredConversations.map((conv) => (
                  <Button
                    key={conv.id}
                    variant="ghost"
                    className={`w-full justify-start text-left truncate rounded-lg group ${
                      currentConversation?.id === conv.id ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-inner' : 'hover:bg-sidebar-accent/70'
                    }`}
                    onClick={() => {
                      setCurrentConversation(conv);
                      if (window.innerWidth < 768) {
                        onClose();
                      }
                    }}
                  >
                    <MessageSquare className={`h-4 w-4 mr-2.5 flex-shrink-0 ${
                      currentConversation?.id === conv.id ? 'text-primary' : 'text-sidebar-foreground/70'
                    }`} />
                    <span className="truncate">
                      {conv.title === 'New Conversation' 
                        ? 'New Chat' 
                        : conv.title}
                    </span>
                    {currentConversation?.id === conv.id && (
                      <span className="ml-auto">
                        <Star className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <Separator className="my-3 bg-sidebar-border" />
          
          <div className="mb-4">
            <h4 className="text-xs font-medium mb-2 text-sidebar-foreground/60 px-2">Categories</h4>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className={`w-full justify-start rounded-lg ${
                  location.pathname === '/' ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-inner' : ''
                }`}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
              >
                <MessageSquare className="h-4 w-4 mr-2.5" />
                <Link to="/" className="flex-1 text-left">Chat</Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
              >
                <FileText className="h-4 w-4 mr-2.5" />
                <span className="flex-1 text-left">Documents</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
              >
                <Image className="h-4 w-4 mr-2.5" />
                <span className="flex-1 text-left">Image Generation</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
              >
                <Code className="h-4 w-4 mr-2.5" />
                <span className="flex-1 text-left">Code Assistant</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
              >
                <Archive className="h-4 w-4 mr-2.5" />
                <span className="flex-1 text-left">Archived Chats</span>
              </Button>
            </div>
          </div>
          
          <Separator className="my-3 bg-sidebar-border" />
          
          <div className="mb-4">
            <h4 className="text-xs font-medium mb-2 text-sidebar-foreground/60 px-2">Settings</h4>
            <Button
              variant="ghost"
              className={`w-full justify-start rounded-lg ${
                location.pathname === '/ai-preferences' ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-inner' : ''
              }`}
              onClick={() => {
                if (window.innerWidth < 768) {
                  onClose();
                }
              }}
            >
              <Settings className="h-4 w-4 mr-2.5" />
              <Link to="/ai-preferences" className="flex-1 text-left">AI Preferences</Link>
            </Button>
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-gradient-to-br from-premium/20 via-premium/15 to-premium-muted/10 backdrop-blur-sm rounded-xl p-4 border border-premium/30 shadow-inner">
            <div className="flex items-center mb-2">
              <div className="h-4 w-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mr-2.5">
                <Crown className="h-2.5 w-2.5 text-white" />
              </div>
              <span className="text-sm font-semibold font-space-grotesk">Free Plan</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Upgrade to access premium features and advanced AI models.
            </p>
            <Button 
              size="sm" 
              className="w-full premium-button h-9 font-space-grotesk letter-spacing-tight hover:shadow-premium/30 transition-all btn-3d"
            >
              <Crown className="h-3.5 w-3.5 mr-1.5" />
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
