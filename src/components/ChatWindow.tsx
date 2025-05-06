
import React, { useRef, useEffect, useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks/useChat';
import { Logo } from './Logo';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ChatWindow() {
  const { currentConversation } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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

  // Generate 3D math particles for the welcome screen
  const renderMathParticles = () => {
    const particles = [];
    const symbols = ['π', '∑', '∫', '√', 'θ', '∞', 'δ', 'Δ', 'φ'];
    
    for (let i = 0; i < 20; i++) {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const delay = Math.random() * 5;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const scale = 0.5 + Math.random() * 1.5;
      const opacity = 0.2 + Math.random() * 0.3;
      
      particles.push(
        <div 
          key={i}
          className="absolute text-primary/20 font-space-grotesk font-bold animate-float"
          style={{
            top: `${y}%`,
            left: `${x}%`,
            animationDelay: `${delay}s`,
            transform: `scale(${scale})`,
            opacity,
            zIndex: -1
          }}
        >
          {symbol}
        </div>
      );
    }
    
    return particles;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] relative">
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-custom"
      >
        <div className="chat-container">
          {!currentConversation?.messages.length ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 math-symbols relative">
              {renderMathParticles()}
              
              <div className="mb-6 animate-float">
                <Logo size="lg" animate={true} />
              </div>
              
              <div className="glass-card p-6 rounded-2xl shadow-3d max-w-md w-full mb-8">
                <h2 className="text-2xl font-bold mb-3 font-space-grotesk bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome to PyThaGO.AI
                </h2>
                <p className="text-muted-foreground mb-5">
                  Your premium mathematics and programming AI assistant. Ask anything to get started.
                </p>
                
                <div className="h-0.5 w-full bg-gradient-to-r from-purple-200/20 via-indigo-300/30 to-purple-200/20 rounded-full my-5"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Solve a quadratic equation",
                    "Explain the Pythagorean theorem",
                    "Help me with Python code",
                    "Calculate the integral of x²"
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      className="btn-3d text-sm bg-background hover:bg-accent transition-all p-3.5 rounded-lg text-left border border-border/60 shadow-xl hover:shadow-md hover-glow flex items-center justify-between"
                      onClick={() => {
                        const textarea = document.querySelector('textarea');
                        if (textarea) {
                          textarea.value = suggestion;
                          textarea.focus();
                          // Trigger an input event to update the textarea value
                          const event = new Event('input', { bubbles: true });
                          textarea.dispatchEvent(event);
                        }
                      }}
                    >
                      <span className="truncate">{suggestion}</span>
                      <span className="ml-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="animate-scale-up">
                <div className="rounded-full px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-xs text-primary-foreground/70 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>Pro version • Unlimited questions</span>
                </div>
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
          className="absolute bottom-24 right-6 rounded-full shadow-lg h-10 w-10 p-0 bg-primary/90 hover:bg-primary animate-bounce"
          onClick={scrollToBottom}
        >
          <ChevronDown className="h-5 w-5" />
        </Button>
      )}
      
      <ChatInput />
    </div>
  );
}
