
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
      <div className="flex items-start">
        {message.type === 'ai' && (
          <Avatar className="h-8 w-8 mr-3 mt-1">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback><Sparkles className="h-4 w-4" /></AvatarFallback>
          </Avatar>
        )}
        
        <div className="flex-1 overflow-hidden">
          {message.isProcessing ? (
            renderTypeAnimation()
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    if (inline) {
                      return (
                        <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <div className="code-block relative group">
                        <pre className="text-sm p-0 m-0 bg-transparent overflow-x-auto">
                          <code className="language-typescript" {...props}>
                            {children}
                          </code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => navigator.clipboard.writeText(String(children))}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    );
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.attachments.map((attachment) => (
                <div 
                  key={attachment.id}
                  className="flex items-center bg-muted p-2 rounded text-sm"
                >
                  {attachment.type.startsWith('image/') ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="h-10 w-10 object-cover rounded mr-2"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center mr-2">
                      <span className="text-xs">{attachment.name.split('.').pop()}</span>
                    </div>
                  )}
                  <span className="truncate flex-1">{attachment.name}</span>
                </div>
              ))}
            </div>
          )}
          
          {message.type === 'ai' && !message.isProcessing && (
            <div className="flex items-center mt-3 space-x-2">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
              
              <Button variant="ghost" size="sm">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Enhance
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Explain simply</DropdownMenuItem>
                  <DropdownMenuItem>Make longer</DropdownMenuItem>
                  <DropdownMenuItem>Make shorter</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        
        {message.type === 'user' && (
          <Avatar className="h-8 w-8 ml-3 mt-1">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}
