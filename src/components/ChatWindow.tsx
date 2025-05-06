
import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks/useChat';
import { Logo } from './Logo';

export function ChatWindow() {
  const { currentConversation } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-custom">
        <div className="chat-container">
          {!currentConversation?.messages.length ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="mb-6">
                <Logo size="lg" />
              </div>
              <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Welcome to PyThaGO.AI</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Your premium mathematics and programming AI assistant. Ask anything to get started.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
                {[
                  "Solve a quadratic equation",
                  "Explain the Pythagorean theorem",
                  "Help me with Python code",
                  "Calculate the integral of x²"
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    className="text-sm bg-background hover:bg-accent transition-colors p-3.5 rounded-lg text-left border border-border/40 shadow-sm"
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
