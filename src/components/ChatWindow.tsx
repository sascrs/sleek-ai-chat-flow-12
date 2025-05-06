
import React, { useRef, useEffect, useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks/useChat';
import { 
  ArrowUp,
  CreateImages, 
  Research, 
  LatestNews, 
  Personas, 
  Workspaces,
  Paperclip,
  Think 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ChatWindow() {
  const { currentConversation } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (!messagesContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      
      setHasScrolled(true);
      setShowScrollButton(!isAtBottom && scrollHeight > clientHeight + 100);
    };
    
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (!hasScrolled || !currentConversation?.messages.length) {
      scrollToBottom();
    }
  }, [currentConversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to get the current greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  // Action button handler
  const handleActionClick = (action: string) => {
    setSelectedAction(action);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-background relative">
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto scrollbar-custom"
      >
        <div className="max-w-[800px] mx-auto px-4 pt-16 pb-32">
          {!currentConversation?.messages.length ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="space-y-4 mb-16">
                <h1 className="text-3xl font-medium text-foreground">
                  {getGreeting()}, Sas.
                </h1>
                <p className="text-3xl font-medium text-muted-foreground">
                  How can I help you today?
                </p>
              </div>
              
              <div className="w-full max-w-[800px] rounded-2xl border border-border/50 bg-background p-6">
                <textarea 
                  placeholder="What do you want to know?" 
                  className="w-full py-2 text-lg bg-transparent outline-none resize-none placeholder:text-muted-foreground/70"
                  rows={1}
                />
                
                <div className="flex flex-wrap gap-2 mt-10 mb-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="rounded-full border border-border/50 bg-transparent hover:bg-accent/10 flex items-center gap-2 px-4 h-10"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`rounded-full border border-border/50 bg-transparent hover:bg-accent/10 flex items-center gap-2 px-4 h-10 ${selectedAction === 'deep-search' ? 'bg-accent/20' : ''}`}
                    onClick={() => handleActionClick('deep-search')}
                  >
                    <img 
                      src="/lovable-uploads/ecec42db-d3f8-4289-b37b-7d86cced8225.png" 
                      alt="Deep Search" 
                      className="h-4 w-4 opacity-80" 
                      style={{ filter: 'grayscale(100%)' }}
                    />
                    <span>DeepSearch</span>
                    <span className="h-3 w-3 text-xs opacity-70">▼</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`rounded-full border border-border/50 bg-transparent hover:bg-accent/10 flex items-center gap-2 px-4 h-10 ${selectedAction === 'think' ? 'bg-accent/20' : ''}`}
                    onClick={() => handleActionClick('think')}
                  >
                    <Think className="h-4 w-4" />
                    <span>Think</span>
                  </Button>
                  
                  <div className="ml-auto flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Grok 3</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-full border border-border/50 bg-transparent hover:bg-accent/10 flex items-center justify-center p-0 h-9 w-9"
                    >
                      <span className="h-4 w-4 text-xs opacity-70">▼</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-full border border-border/50 bg-transparent hover:bg-accent/10 flex items-center justify-center p-0 h-9 w-9"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-10 justify-center px-4 max-w-3xl">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full border border-border/50 bg-transparent hover:bg-accent/10 flex items-center gap-2 px-5 h-11"
                >
                  <CreateImages className="h-4 w-4" />
                  <span>Create Images</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full border border-border/50 bg-transparent hover:bg-accent/10 flex items-center gap-2 px-5 h-11"
                >
                  <Research className="h-4 w-4" />
                  <span>Research</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full border border-border/50 bg-transparent hover:bg-accent/10 flex items-center gap-2 px-5 h-11"
                >
                  <LatestNews className="h-4 w-4" />
                  <span>Latest News</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full border border-border/50 bg-transparent hover:bg-accent/10 flex items-center gap-2 px-5 h-11"
                >
                  <Personas className="h-4 w-4" />
                  <span>Personas</span>
                  <span className="h-3 w-3 text-xs opacity-70">▼</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full border border-border/50 bg-transparent hover:bg-accent/10 flex items-center gap-2 px-5 h-11"
                >
                  <Workspaces className="h-4 w-4" />
                  <span>Workspaces</span>
                  <span className="h-3 w-3 text-xs opacity-70">▼</span>
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-5 opacity-90">
                <div className="py-2 px-4 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 inline-flex items-center gap-2 shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-xs font-medium text-foreground/70">New conversation</span>
                </div>
              </div>
              
              {currentConversation.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} className="pt-2" />
        </div>
      </div>
      
      {/* Scroll to bottom button */}
      {showScrollButton && (
        <Button
          className="absolute bottom-24 right-6 rounded-full shadow-lg h-10 w-10 p-0 bg-primary/90 hover:bg-primary"
          onClick={scrollToBottom}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
      
      {/* Only show ChatInput when there are messages */}
      {currentConversation?.messages.length > 0 && <ChatInput />}
    </div>
  );
}
