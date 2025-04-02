
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, StopCircle, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from './FileUpload';
import { Attachment } from '@/types';
import { useChat } from '@/hooks/useChat';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && attachments.length === 0) return;
    
    sendMessage(message, attachments.length > 0 ? attachments : undefined);
    setMessage('');
    setAttachments([]);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
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
    <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
      <div className="mx-auto max-w-3xl">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {attachments.map(attachment => (
              <div key={attachment.id} className="bg-muted rounded-md p-1 pl-2 flex items-center text-sm">
                <span className="truncate max-w-[150px]">{attachment.name}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 ml-1" 
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
            placeholder="Message SleekAI..."
            className="min-h-10 w-full resize-none rounded-xl border pr-16 py-3 shadow-sm focus-visible:ring-1"
            disabled={isProcessing}
          />
          
          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 rounded-full" 
              onClick={() => setIsUploading(true)}
              disabled={isProcessing}
            >
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach files</span>
            </Button>
            
            <Button 
              type="submit" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-primary" 
              disabled={(!message.trim() && attachments.length === 0) || isProcessing}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
        
        <div className="mt-2 flex justify-center space-x-2">
          {isProcessing ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={stopGenerating}
              className="text-xs"
            >
              <StopCircle className="h-3.5 w-3.5 mr-1" />
              Stop generating
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={regenerateLastResponse}
                className="text-xs"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Regenerate
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearChat}
                className="text-xs"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
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
