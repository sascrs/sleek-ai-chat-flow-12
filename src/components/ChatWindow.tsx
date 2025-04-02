
import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks/useChat';

export function ChatWindow() {
  const { currentConversation } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="chat-container">
          {!currentConversation?.messages.length ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to SleekAI</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Experience a premium chat interface with advanced AI capabilities. 
                Ask anything to get started.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
                {[
                  "Generate a creative story",
                  "Explain quantum computing",
                  "Draft a professional email",
                  "Help me solve a math problem"
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    className="text-sm bg-muted hover:bg-muted/80 transition-colors p-3 rounded-lg text-left"
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
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            currentConversation.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput />
    </div>
  );
}
