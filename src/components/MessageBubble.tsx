
import React, { useState } from 'react';
import { Message } from '@/types';
import { Copy, Check, Calculator, MoreHorizontal, Code, ArrowUpRight, Lightbulb, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = React.useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success('Content copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const renderTypeAnimation = () => {
    return (
      <div className="typing-indicator">
        <span className="typing-dot delay-75"></span>
        <span className="typing-dot delay-150"></span>
        <span className="typing-dot delay-300"></span>
      </div>
    );
  };

  const handleFeedback = (type: string) => {
    setActiveFeedback(type);
    toast.success(`Thank you for your ${type === 'like' ? 'positive' : 'negative'} feedback!`);
  };
  
  // CSS classes based on message type
  const bubbleClass = message.type === 'ai' ? 'ai-message' : 'user-message';
  
  return (
    <div 
      className={`message-bubble ${bubbleClass} ${isHovered && message.type === 'ai' ? 'shadow-neon transition-shadow duration-300' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        {message.type === 'ai' && (
          <Avatar className="h-8 w-8 ring-2 ring-primary/20 mt-1 shadow-sm">
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600">
              <Calculator className="h-4 w-4 text-white" />
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className="flex-1 overflow-hidden">
          {message.isProcessing ? (
            renderTypeAnimation()
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !(className?.includes('language-'));
                    
                    if (!isInline) {
                      return (
                        <div className="code-block relative group rounded-xl overflow-hidden border border-border/50 shadow-lg my-4">
                          <div className="bg-muted/70 backdrop-blur-md px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border/50 flex items-center">
                            <div className="flex items-center gap-1.5 mr-3">
                              <div className="h-2.5 w-2.5 rounded-full bg-red-500/70"></div>
                              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70"></div>
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500/70"></div>
                            </div>
                            <span className="flex-1">{match ? match[1] : 'code'}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(String(children));
                                toast.success("Code copied to clipboard");
                              }}
                              className="h-7 opacity-70 hover:opacity-100 transition-opacity"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <pre className="text-sm p-4 m-0 overflow-x-auto bg-muted/30 backdrop-blur-sm scrollbar-custom">
                            <code className={match ? `language-${match[1]}` : ''} {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      );
                    }
                    return (
                      <code className="bg-muted/80 backdrop-blur-sm px-1.5 py-0.5 rounded-md text-sm font-mono" {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.attachments.map((attachment) => (
                <div 
                  key={attachment.id}
                  className="flex items-center bg-background/80 backdrop-blur-md border border-border/40 p-2.5 rounded-lg text-sm shadow-sm hover:shadow-md transition-all card-3d"
                >
                  {attachment.type.startsWith('image/') ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="h-12 w-12 object-cover rounded-md mr-3"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-primary/10 rounded-md flex items-center justify-center mr-3 text-primary">
                      <span className="text-xs uppercase font-semibold">{attachment.name.split('.').pop()}</span>
                    </div>
                  )}
                  <span className="truncate flex-1 font-medium">{attachment.name}</span>
                </div>
              ))}
            </div>
          )}
          
          {message.type === 'ai' && !message.isProcessing && (
            <div className="flex flex-wrap items-center mt-4 gap-2">
              {/* Feedback buttons */}
              <div className="flex items-center gap-1 mr-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleFeedback('like')}
                  className={`h-7 w-7 rounded-full p-0 ${activeFeedback === 'like' ? 'bg-green-100 text-green-700 dark:bg-green-900/70 dark:text-green-300' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleFeedback('dislike')}
                  className={`h-7 w-7 rounded-full p-0 ${activeFeedback === 'dislike' ? 'bg-red-100 text-red-700 dark:bg-red-900/70 dark:text-red-300' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 14V2" />
                    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                  </svg>
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy} 
                className="h-8 text-xs font-medium bg-background/80 backdrop-blur-md border-border/60 hover:bg-accent/50 hover:border-primary/50 shadow-sm transition-all btn-3d"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 mr-1.5" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs font-medium bg-background/80 backdrop-blur-md border-border/60 hover:bg-accent/50 hover:border-primary/50 shadow-sm transition-all btn-3d"
              >
                <Calculator className="h-3.5 w-3.5 mr-1.5" />
                <span>Compute</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs font-medium bg-background/80 backdrop-blur-md border-border/60 hover:bg-accent/50 hover:border-primary/50 shadow-sm transition-all btn-3d"
              >
                <Code className="h-3.5 w-3.5 mr-1.5" />
                <span>Generate Code</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 bg-background/80 backdrop-blur-md border-border/60 hover:bg-accent/50 shadow-sm hover:border-primary/50 transition-all btn-3d"
                  >
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-48 bg-background/95 backdrop-blur-lg border-border/60 shadow-lg animate-scale-up"
                >
                  <DropdownMenuItem className="flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Show step by step</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Lightbulb className="h-3.5 w-3.5" />
                    <span>Explain differently</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    <span>Share response</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        
        {message.type === 'user' && (
          <Avatar className="h-8 w-8 ring-2 ring-primary/10 mt-1 shadow-sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-gradient-to-br from-user to-user/70 text-white">U</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}
