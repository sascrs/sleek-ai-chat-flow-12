
import React from 'react';
import { 
  MessageSquare, 
  FileText, 
  Image, 
  Settings, 
  PlusCircle,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useChat } from '@/hooks/useChat';
import { Logo } from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { conversations, startNewConversation, currentConversation, setCurrentConversation } = useChat();
  
  const handleNewChat = () => {
    startNewConversation();
  };
  
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
        className={`fixed inset-y-0 left-0 w-72 z-40 transform transition-transform duration-300 ease-in-out ${sidebarClass} flex flex-col border-r bg-sidebar/50 backdrop-blur-md`}
      >
        <div className="flex items-center justify-between p-4">
          <Logo size="sm" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full" 
            onClick={onClose}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4">
          <Button 
            className="w-full justify-start rounded-xl h-10 bg-gradient-to-r from-primary/95 to-primary/85 hover:from-primary hover:to-primary/90 shadow-sm" 
            onClick={handleNewChat}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
        
        <ScrollArea className="flex-1 px-3">
          {conversations.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-medium mb-2 text-sidebar-foreground/60 px-2">Recent Conversations</h4>
              <div className="space-y-1">
                {conversations.map((conv) => (
                  <Button
                    key={conv.id}
                    variant="ghost"
                    className={`w-full justify-start text-left truncate rounded-lg ${
                      currentConversation?.id === conv.id ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : ''
                    }`}
                    onClick={() => setCurrentConversation(conv)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2.5 flex-shrink-0" />
                    <span className="truncate">
                      {conv.title === 'New Conversation' 
                        ? 'New Chat' 
                        : conv.title}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <Separator className="my-3" />
          
          <div className="mb-4">
            <h4 className="text-xs font-medium mb-2 text-sidebar-foreground/60 px-2">Categories</h4>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
              >
                <MessageSquare className="h-4 w-4 mr-2.5" />
                Chat
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
              >
                <FileText className="h-4 w-4 mr-2.5" />
                Documents
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
              >
                <Image className="h-4 w-4 mr-2.5" />
                Image Generation
              </Button>
            </div>
          </div>
          
          <Separator className="my-3" />
          
          <div className="mb-4">
            <h4 className="text-xs font-medium mb-2 text-sidebar-foreground/60 px-2">Settings</h4>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-lg"
            >
              <Settings className="h-4 w-4 mr-2.5" />
              AI Preferences
            </Button>
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="bg-gradient-to-br from-premium/20 to-premium-muted/20 backdrop-blur-sm rounded-xl p-4 border border-premium/30">
            <div className="flex items-center mb-2">
              <div className="h-4 w-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mr-2.5"></div>
              <span className="text-sm font-semibold">Free Plan</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Upgrade to access premium features and advanced AI models.
            </p>
            <Button 
              size="sm" 
              className="w-full premium-button h-9"
            >
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
