
import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, ArrowUp, Think, Workspaces, Personas } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from './FileUpload';
import { Attachment } from '@/types';
import { useChat } from '@/hooks/useChat';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { toast } from 'sonner';

export function ChatInput() {
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLFormElement>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  
  const { 
    sendMessage, 
    isProcessing, 
    stopGenerating, 
    regenerateLastResponse,
    clearChat
  } = useChat();

  // Adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && attachments.length === 0) return;
    
    try {
      await sendMessage(message, attachments.length > 0 ? attachments : undefined);
      setMessage('');
      setAttachments([]);
      
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFilesSelected = (selectedAttachments: Attachment[]) => {
    setAttachments(prev => [...prev, ...selectedAttachments]);
    toast.success(`${selectedAttachments.length} file${selectedAttachments.length > 1 ? 's' : ''} added`);
  };

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(a => a.id !== id));
  };
  
  const handleActionClick = (action: string) => {
    setSelectedAction(action === selectedAction ? null : action);
  };

  return (
    <div className="border-t bg-background px-4 py-4 sticky bottom-0 z-10">
      <div className="mx-auto max-w-[800px]">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3.5">
            {attachments.map(attachment => (
              <div key={attachment.id} 
                className="bg-background/80 border border-border/60 rounded-md p-1.5 pl-3 flex items-center text-sm shadow-sm"
              >
                <span className="truncate max-w-[150px]">{attachment.name}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 ml-1.5 opacity-70 hover:opacity-100" 
                  onClick={() => removeAttachment(attachment.id)}
                >
                  <span className="text-xs">✕</span>
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <form 
          ref={inputContainerRef}
          onSubmit={handleSubmit} 
          className="relative transition-all duration-300"
        >
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="What do you want to know?"
              className="min-h-12 w-full resize-none rounded-xl border-border/30 py-3.5 pl-4 pr-24 text-base placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-border/50"
              disabled={isProcessing}
            />
            
            <div className="absolute right-2 bottom-2 flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    type="button" 
                    size="icon" 
                    variant="ghost" 
                    className="h-9 w-9 rounded-full hover:bg-accent/10" 
                    onClick={() => setIsUploading(true)}
                    disabled={isProcessing}
                  >
                    <Paperclip className="h-4 w-4" />
                    <span className="sr-only">Attach files</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  Attach files
                </TooltipContent>
              </Tooltip>
              
              <Button 
                type="submit" 
                size="icon" 
                className="h-9 w-9 rounded-full bg-foreground text-background hover:bg-foreground/90" 
                disabled={(!message.trim() && attachments.length === 0) || isProcessing}
              >
                <ArrowUp className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <Button 
              type="button"
              variant="outline" 
              size="sm"
              className={`rounded-full border border-border/50 bg-transparent hover:bg-accent/10 flex items-center gap-2 px-3 h-9 text-sm ${selectedAction === 'deep-search' ? 'bg-accent/20' : ''}`}
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
              type="button"
              variant="outline" 
              size="sm"
              className={`rounded-full border border-border/50 bg-transparent hover:bg-accent/10 flex items-center gap-2 px-3 h-9 text-sm ${selectedAction === 'think' ? 'bg-accent/20' : ''}`}
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
                className="rounded-full border border-border/50 bg-transparent hover:bg-accent/10 flex items-center justify-center p-0 h-7 w-7"
              >
                <span className="h-4 w-4 text-xs opacity-70">▼</span>
              </Button>
            </div>
          </div>
        </form>
        
        <FileUpload 
          isVisible={isUploading} 
          onClose={() => setIsUploading(false)} 
          onFilesSelected={handleFilesSelected} 
        />
      </div>
    </div>
  );
}
