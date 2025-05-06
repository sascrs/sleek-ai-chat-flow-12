
import React from 'react';
import { Message } from '@/types';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAI = message.role === 'assistant';
  
  return (
    <div className={cn(
      "mb-6 max-w-full",
      isAI ? "mr-16" : "ml-16"
    )}>
      <div className={cn(
        "px-0 py-1 text-base",
        isAI ? "" : "flex justify-end"
      )}>
        <span className="text-sm font-medium text-muted-foreground">
          {isAI ? 'Grok' : 'You'}
        </span>
      </div>
      
      <div className={cn(
        "mt-1.5 text-base",
        isAI ? "bg-transparent text-foreground" : "bg-transparent text-foreground text-right"
      )}>
        <ReactMarkdown className="prose dark:prose-invert max-w-none prose-p:my-1 prose-pre:my-2 prose-headings:my-2">
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
