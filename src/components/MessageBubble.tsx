
import React from 'react';
import { Message } from '@/types';
import { Copy, Check, Sparkles, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
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
  
  // CSS classes based on message type
  const bubbleClass = message.type === 'ai' ? 'ai-message' : 'user-message';
  
  return (
    <div className={`message-bubble ${bubbleClass}`}>
      <div className="flex items-start gap-3">
        {message.type === 'ai' && (
          <Avatar className="h-8 w-8 ring-2 ring-primary/10 mt-1">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-gradient-to-br from-ai to-ai/50"><Sparkles className="h-4 w-4 text-white" /></AvatarFallback>
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
                        <div className="code-block relative group rounded-lg overflow-hidden border border-border/50">
                          <div className="bg-muted/50 px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border/50 flex items-center">
                            <span className="flex-1">{match ? match[1] : 'code'}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 opacity-70 hover:opacity-100 transition-opacity"
                              onClick={() => navigator.clipboard.writeText(String(children))}
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <pre className="text-sm p-4 m-0 overflow-x-auto bg-muted/20">
                            <code className={match ? `language-${match[1]}` : ''} {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      );
                    }
                    return (
                      <code className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono" {...props}>
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
                  className="flex items-center bg-background/80 backdrop-blur-sm border border-border/40 p-2.5 rounded-lg text-sm"
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
            <div className="flex items-center mt-4 space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 text-xs font-medium">
                {copied ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <Copy className="h-3.5 w-3.5 mr-1.5" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
              
              <Button variant="outline" size="sm" className="h-8 text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Enhance
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Explain simply</DropdownMenuItem>
                  <DropdownMenuItem>Make longer</DropdownMenuItem>
                  <DropdownMenuItem>Make shorter</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        
        {message.type === 'user' && (
          <Avatar className="h-8 w-8 ring-2 ring-primary/10 mt-1">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-gradient-to-br from-user to-user/70 text-white">U</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}
