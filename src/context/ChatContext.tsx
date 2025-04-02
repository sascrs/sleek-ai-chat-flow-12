
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Message, Conversation, Attachment } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  setCurrentConversation: (conversation: Conversation | null) => void;
  sendMessage: (content: string, attachments?: Attachment[]) => Promise<void>;
  startNewConversation: () => void;
  isProcessing: boolean;
  regenerateLastResponse: () => Promise<void>;
  stopGenerating: () => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize with a default conversation
  React.useEffect(() => {
    if (conversations.length === 0) {
      startNewConversation();
    }
  }, []);

  const startNewConversation = () => {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversation(newConversation);
  };

  const sendMessage = async (content: string, attachments?: Attachment[]) => {
    if (!content.trim() && (!attachments || attachments.length === 0)) return;
    if (!currentConversation) return;

    // Create user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      type: 'user',
      timestamp: new Date(),
      attachments,
    };

    // Create processing AI message
    const aiMessage: Message = {
      id: uuidv4(),
      content: '',
      type: 'ai',
      timestamp: new Date(),
      isProcessing: true,
    };

    // Update conversation with user message and processing AI message
    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, userMessage, aiMessage],
      updatedAt: new Date(),
    };

    setCurrentConversation(updatedConversation);
    setConversations((prev) =>
      prev.map((conv) => (conv.id === updatedConversation.id ? updatedConversation : conv))
    );

    setIsProcessing(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = getAIResponse(content);
      
      // Update AI message with response
      const completedAiMessage: Message = {
        ...aiMessage,
        content: aiResponse,
        isProcessing: false,
      };

      const finalConversation = {
        ...updatedConversation,
        messages: [
          ...updatedConversation.messages.slice(0, -1),
          completedAiMessage,
        ],
      };

      setCurrentConversation(finalConversation);
      setConversations((prev) =>
        prev.map((conv) => (conv.id === finalConversation.id ? finalConversation : conv))
      );
      setIsProcessing(false);
    }, 2000);
  };

  const regenerateLastResponse = async () => {
    if (!currentConversation || currentConversation.messages.length < 2) return;
    
    // Find the last user message to regenerate a response for
    const messages = [...currentConversation.messages];
    let lastUserMessageIndex = -1;
    
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].type === 'user') {
        lastUserMessageIndex = i;
        break;
      }
    }
    
    if (lastUserMessageIndex === -1) return;
    
    // Remove all messages after the last user message
    const userMessage = messages[lastUserMessageIndex];
    const newMessages = messages.slice(0, lastUserMessageIndex + 1);
    
    // Add a new processing AI message
    const aiMessage: Message = {
      id: uuidv4(),
      content: '',
      type: 'ai',
      timestamp: new Date(),
      isProcessing: true,
    };
    
    newMessages.push(aiMessage);
    
    const updatedConversation = {
      ...currentConversation,
      messages: newMessages,
      updatedAt: new Date(),
    };
    
    setCurrentConversation(updatedConversation);
    setConversations((prev) =>
      prev.map((conv) => (conv.id === updatedConversation.id ? updatedConversation : conv))
    );
    
    setIsProcessing(true);
    
    // Simulate regenerating response
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage.content);
      
      const completedAiMessage: Message = {
        ...aiMessage,
        content: aiResponse,
        isProcessing: false,
      };
      
      const finalConversation = {
        ...updatedConversation,
        messages: [
          ...updatedConversation.messages.slice(0, -1),
          completedAiMessage,
        ],
      };
      
      setCurrentConversation(finalConversation);
      setConversations((prev) =>
        prev.map((conv) => (conv.id === finalConversation.id ? finalConversation : conv))
      );
      setIsProcessing(false);
    }, 2000);
  };

  const stopGenerating = () => {
    if (!isProcessing || !currentConversation) return;
    
    setIsProcessing(false);
    
    // Find the processing message and mark it as complete
    const messages = [...currentConversation.messages];
    const processingIndex = messages.findIndex(m => m.isProcessing);
    
    if (processingIndex !== -1) {
      const processingMessage = messages[processingIndex];
      
      const completedMessage: Message = {
        ...processingMessage,
        content: processingMessage.content || "Generation stopped.",
        isProcessing: false,
      };
      
      messages[processingIndex] = completedMessage;
      
      const updatedConversation = {
        ...currentConversation,
        messages,
      };
      
      setCurrentConversation(updatedConversation);
      setConversations((prev) =>
        prev.map((conv) => (conv.id === updatedConversation.id ? updatedConversation : conv))
      );
    }
  };

  const clearChat = () => {
    if (!currentConversation) return;
    
    const clearedConversation = {
      ...currentConversation,
      messages: [],
      updatedAt: new Date(),
    };
    
    setCurrentConversation(clearedConversation);
    setConversations((prev) =>
      prev.map((conv) => (conv.id === clearedConversation.id ? clearedConversation : conv))
    );
  };

  // Simulated AI response generator
  const getAIResponse = (userMessage: string) => {
    const responses = [
      `I understand you're asking about "${userMessage}". Let me provide a structured response:

## Overview
This is a premium AI response that demonstrates formatting capabilities including headings, lists, and code blocks.

## Key Points
* First, let's address your main question
* Second, here's some additional context
* Third, I can suggest some next steps

## Code Example
\`\`\`javascript
// Here's a sample code implementation
function processRequest(input) {
  return {
    result: input + " processed successfully",
    timestamp: new Date().toISOString()
  };
}
\`\`\`

Would you like me to expand on any particular aspect of this response?`,
      `Thanks for your message about "${userMessage}". Here's what you need to know:

## Analysis
I've analyzed your request and can provide the following insights.

## Recommendations
1. Consider approaching this from a different angle
2. Implement the suggested solutions step by step
3. Review the results and iterate as needed

## Technical Details
\`\`\`python
# Python implementation
def analyze_input(text):
    return {
        "sentiment": "positive",
        "key_topics": ["AI", "technology", "implementation"],
        "confidence_score": 0.87
    }
\`\`\`

Is there anything specific from this response you'd like me to elaborate on?`,
      `I've processed your query about "${userMessage}" and prepared a comprehensive response:

## Summary
Your request touches on several important concepts that I'll address systematically.

## Detailed Explanation
- **First concept**: Here's what you need to understand
- **Second concept**: This builds upon the first point
- **Third concept**: Finally, this ties everything together

## Implementation Strategy
\`\`\`typescript
interface Solution {
  approach: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeRequired: number; // in hours
}

const recommendedSolution: Solution = {
  approach: "Integrated framework",
  difficulty: "medium",
  timeRequired: 4.5
};
\`\`\`

Would you like me to create a more detailed plan based on this analysis?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversation,
        setCurrentConversation,
        sendMessage,
        startNewConversation,
        isProcessing,
        regenerateLastResponse,
        stopGenerating,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
