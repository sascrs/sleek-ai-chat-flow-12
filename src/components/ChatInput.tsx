
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, StopCircle, RefreshCw, Trash2 } from 'lucide-react';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
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
  };

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(a => a.id !== id));
  };

  return (
    <div className="border-t bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-4 sticky bottom-0 z-10">
      <div className="mx-auto max-w-3xl">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2.5">
            {attachments.map(attachment => (
              <div key={attachment.id} className="bg-background border border-border rounded-md p-1.5 pl-3 flex items-center text-sm shadow-sm">
                <span className="truncate max-w-[150px]">{attachment.name}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 ml-1.5 opacity-70 hover:opacity-100" 
                  onClick={() => removeAttachment(attachment.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message PyThaGO.AI..."
            className="min-h-12 w-full resize-none rounded-xl border pr-20 py-3.5 pl-4 shadow-sm bg-background/90 focus-visible:ring-1 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/70"
            disabled={isProcessing}
          />
          
          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost" 
                  className="h-9 w-9 rounded-full opacity-80 hover:opacity-100" 
                  onClick={() => setIsUploading(true)}
                  disabled={isProcessing}
                >
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach files</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach files</TooltipContent>
            </Tooltip>
            
            <Button 
              type="submit" 
              size="icon" 
              className="h-9 w-9 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-md hover:shadow-lg transition-all" 
              disabled={(!message.trim() && attachments.length === 0) || isProcessing}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
        
        <div className="mt-3 flex justify-center space-x-2">
          {isProcessing ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={stopGenerating}
              className="text-xs bg-background/60 font-medium h-7"
            >
              <StopCircle className="h-3.5 w-3.5 mr-1.5" />
              Stop generating
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={regenerateLastResponse}
                className="text-xs bg-background/60 font-medium h-7"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Regenerate
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearChat}
                className="text-xs bg-background/60 font-medium h-7"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Clear chat
              </Button>
            </>
          )}
        </div>
        
        <FileUpload 
          isVisible={isUploading} 
          onClose={() => setIsUploading(false)} 
          onFilesSelected={handleFilesSelected} 
        />
      </div>
    </div>
  );
}
