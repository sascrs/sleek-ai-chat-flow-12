
import React from 'react';
import { 
  MessageSquare, 
  FileText, 
  Image, 
  Settings, 
  PlusCircle,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useChat } from '@/hooks/useChat';

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
        className={`fixed inset-y-0 left-0 w-64 z-40 transform transition-transform duration-300 ease-in-out ${sidebarClass} flex flex-col border-r bg-sidebar`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 text-primary mr-2" />
            <span className="font-medium">SleekAI</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={onClose}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4">
          <Button 
            className="w-full justify-start" 
            onClick={handleNewChat}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
        
        <ScrollArea className="flex-1">
          {conversations.length > 0 && (
            <div className="p-3">
              <h4 className="text-xs font-medium mb-2 text-muted-foreground">Recent Conversations</h4>
              <div className="space-y-1">
                {conversations.map((conv) => (
                  <Button
                    key={conv.id}
                    variant="ghost"
                    className={`w-full justify-start text-left truncate ${
                      currentConversation?.id === conv.id ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                    }`}
                    onClick={() => setCurrentConversation(conv)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
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
          
          <Separator className="my-2" />
          
          <div className="p-3">
            <h4 className="text-xs font-medium mb-2 text-muted-foreground">Categories</h4>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <Image className="h-4 w-4 mr-2" />
                Image Generation
              </Button>
            </div>
          </div>
          
          <Separator className="my-2" />
          
          <div className="p-3">
            <h4 className="text-xs font-medium mb-2 text-muted-foreground">Settings</h4>
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <Settings className="h-4 w-4 mr-2" />
              AI Preferences
            </Button>
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="bg-sidebar-accent/50 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <Sparkles className="h-4 w-4 text-premium mr-2" />
              <span className="text-sm font-medium">Free Plan</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Upgrade to access premium features and advanced AI models.
            </p>
            <Button 
              size="sm" 
              className="w-full premium-button"
            >
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
