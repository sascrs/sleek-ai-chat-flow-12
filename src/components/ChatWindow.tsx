
import React, { useRef, useEffect, useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks/useChat';
import { Logo } from './Logo';
import { ChevronDown, Sparkles, Brain, Code, Calculator, BookOpen, Pi } from 'lucide-react';
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
              
              <div className="bg-gradient-to-br from-violet-500/10 via-indigo-500/5 to-purple-500/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8 max-w-md w-full mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600"></div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-1.5 rounded-md">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold font-space-grotesk bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    PyThaGO.AI
                  </h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Your premium mathematics and programming AI assistant. Ask anything to get started.
                </p>
                
                <div className="grid grid-cols-1 gap-3 mb-6">
                  <div className="suggestion-card bg-white/5 border border-white/10 hover:bg-white/10 transition-all p-4 rounded-xl shadow-lg hover:shadow-indigo-500/10 group">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 bg-indigo-500/20 p-2 rounded-md text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
                        <Pi className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm mb-1 group-hover:text-indigo-300 transition-colors">Solve Complex Equations</h3>
                        <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">Get step-by-step solutions for quadratic, polynomial or differential equations</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="suggestion-card bg-white/5 border border-white/10 hover:bg-white/10 transition-all p-4 rounded-xl shadow-lg hover:shadow-purple-500/10 group">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 bg-purple-500/20 p-2 rounded-md text-purple-400 group-hover:bg-purple-500/30 transition-colors">
                        <Code className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm mb-1 group-hover:text-purple-300 transition-colors">Code Assistance</h3>
                        <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">Get help with Python, JavaScript, and other programming languages</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="suggestion-card bg-white/5 border border-white/10 hover:bg-white/10 transition-all p-4 rounded-xl shadow-lg hover:shadow-violet-500/10 group">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 bg-violet-500/20 p-2 rounded-md text-violet-400 group-hover:bg-violet-500/30 transition-colors">
                        <Brain className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm mb-1 group-hover:text-violet-300 transition-colors">Deep Learning Concepts</h3>
                        <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">Explore machine learning, neural networks, and AI fundamentals</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 hover:text-white gap-2 text-xs h-8">
                    <Calculator className="h-3.5 w-3.5" />
                    <span>Explore Calculators</span>
                  </Button>
                  <Button size="sm" variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 hover:text-white gap-2 text-xs h-8">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>View Tutorials</span>
                  </Button>
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
