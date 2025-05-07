import React, { useRef, useEffect, useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks/useChat';
import { Logo } from './Logo';
import { ChevronDown, Sparkles, Pi, Brain, Code, Calculator, BookOpen, Search, Lightbulb, MessageCircle, Edit, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

interface ChatPrompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon: React.ElementType;
  color: string;
}

export function ChatWindow() {
  const { currentConversation, sendMessage } = useChat();
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

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  // Generate 3D math particles for the welcome screen
  const renderMathParticles = () => {
    const particles = [];
    const symbols = ['π', '∑', '∫', '√', 'θ', '∞', 'δ', 'Δ', 'φ'];
    
    for (let i = 0; i < 24; i++) {
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

  // Define chat prompts
  const chatPrompts: ChatPrompt[] = [
    {
      id: "math-problem",
      title: "Probleme Matematice",
      description: "Rezolvă ecuații și concepte matematice complexe",
      prompt: "Rezolvă pas cu pas ecuația diferențială: dy/dx = 2xy cu y(0) = 1",
      icon: Pi,
      color: "bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30"
    },
    {
      id: "code-assistance",
      title: "Asistență Cod",
      description: "Ajutor cu programare și debugging",
      prompt: "Explică-mi cum să implementez un algoritm de sortare rapidă în Python",
      icon: Code,
      color: "bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30"
    },
    {
      id: "learning-concepts",
      title: "Învățare Concepte",
      description: "Explicații detaliate pentru învățare",
      prompt: "Explică-mi conceptul de Machine Learning într-un mod simplu de înțeles",
      icon: Brain, 
      color: "bg-violet-500/20 text-violet-400 group-hover:bg-violet-500/30"
    },
    {
      id: "research",
      title: "Cercetare",
      description: "Ajutor în găsirea și sintetizarea informațiilor",
      prompt: "Ce sunt rețelele neuronale și cum funcționează ele?",
      icon: Search,
      color: "bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30" 
    },
    {
      id: "creative-ideas",
      title: "Idei Creative",
      description: "Generarea de idei și inspirație",
      prompt: "Dă-mi 5 idei de proiecte creative care combină matematica cu arta",
      icon: Lightbulb,
      color: "bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30"
    },
    {
      id: "explain",
      title: "Explicații",
      description: "Explicații detaliate pe diverse subiecte",
      prompt: "Explică Teorema lui Fermat și implicațiile sale în matematică modernă",
      icon: MessageCircle,
      color: "bg-green-500/20 text-green-400 group-hover:bg-green-500/30"
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="animated-blob bg-purple-400/20 w-[500px] h-[500px] -top-48 -right-48"></div>
        <div className="animated-blob bg-blue-400/20 w-[600px] h-[600px] -bottom-48 -left-48" style={{ animationDelay: '-3s' }}></div>
      </div>
      
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 scrollbar-custom"
      >
        <div className="chat-container">
          {!currentConversation?.messages.length ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-2 sm:px-4 math-symbols relative">
              {renderMathParticles()}
              
              <div className="mb-4 sm:mb-6 animate-float-slow relative">
                <div className="absolute inset-0 -z-10 bg-gradient-radial from-primary/5 to-transparent rounded-full blur-2xl"></div>
                <Logo size="lg" animate={true} />
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/10 shadow-glass p-4 sm:p-6 lg:p-8 max-w-md w-full mb-6 sm:mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600"></div>
                <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk gradient-text mb-3 sm:mb-4">
                  PyThaGO.AI
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                  Asistentul tău premium pentru matematică și programare. Alege unul dintre prompt-urile de mai jos pentru a începe.
                </p>
                
                <div className="grid grid-cols-1 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {chatPrompts.slice(0, 3).map((prompt) => (
                    <button 
                      key={prompt.id}
                      className="suggestion-card bg-white/5 border border-white/10 hover:bg-white/10 transition-all p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-soft hover:shadow-premium/10 group text-left"
                      onClick={() => handlePromptClick(prompt.prompt)}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className={`mt-0.5 p-1.5 sm:p-2 rounded-md transition-colors ${prompt.color}`}>
                          <prompt.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-xs sm:text-sm mb-0.5 sm:mb-1 group-hover:text-indigo-300 transition-colors">{prompt.title}</h3>
                          <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 line-clamp-2">{prompt.description}</p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground/50 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                      </div>
                    </button>
                  ))}
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-xs">
                      <Edit className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 sm:mr-2" />
                      <span>Mai multe prompt-uri</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-background/80 backdrop-blur-lg border-white/10 p-2 sm:p-3 w-[280px] sm:w-auto">
                    <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                      {chatPrompts.slice(3).map((prompt) => (
                        <button 
                          key={prompt.id}
                          className="flex items-center gap-2 p-1.5 sm:p-2 hover:bg-white/10 rounded-md transition-all text-left text-xs sm:text-sm group"
                          onClick={() => handlePromptClick(prompt.prompt)}
                        >
                          <div className={`p-1 sm:p-1.5 rounded-md transition-colors ${prompt.color}`}>
                            <prompt.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          </div>
                          <span className="flex-1">{prompt.title}</span>
                          <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-3 sm:mb-5 opacity-90">
                <div className="py-1.5 sm:py-2 px-3 sm:px-4 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 inline-flex items-center gap-1.5 sm:gap-2 shadow-sm">
                  <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-green-500"></div>
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
          className="fixed bottom-24 right-4 sm:right-6 rounded-full shadow-md h-8 w-8 sm:h-10 sm:w-10 p-0 bg-primary/90 hover:bg-primary animate-bounce z-10"
          onClick={scrollToBottom}
        >
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      )}
      
      <ChatInput />
    </div>
  );
}
