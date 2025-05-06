
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Message, Conversation, Attachment } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { useSettings } from './SettingsContext';

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
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const { aiProviders } = useSettings();

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

  const fetchAIResponse = async (messageContent: string): Promise<string> => {
    try {
      const controller = new AbortController();
      setAbortController(controller);
      
      // Get the active provider from settings
      const activeProvider = aiProviders.find(provider => provider.isActive);
      
      // Default to Groq if no active provider with an API key is found
      const API_KEY = activeProvider?.apiKey || "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";
      const providerName = activeProvider?.name || "Groq";
      
      // If the active provider doesn't have an API key set, show a warning toast
      if (activeProvider && !activeProvider.apiKey) {
        toast.warning(`No API key set for ${activeProvider.name}. Please add an API key in AI Preferences.`);
      }
      
      // Use different endpoints based on the provider
      let endpoint = 'https://api.groq.com/openai/v1/chat/completions';
      let model = 'llama3-70b-8192';
      
      if (activeProvider) {
        switch (activeProvider.id) {
          case 'openai':
            endpoint = 'https://api.openai.com/v1/chat/completions';
            model = 'gpt-4o-mini';
            break;
          case 'llama':
            // This would need specific endpoint details
            break;
          case 'deepseek':
            // This would need specific endpoint details
            break;
          // Default is already set to Groq
        }
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'system',
              content: 'You are PyThaGO.AI, a premium and highly capable assistant with deep knowledge in mathematics, programming, and problem-solving. Provide detailed, thoughtful responses with good formatting using markdown.'
            },
            {
              role: 'user',
              content: messageContent
            }
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Failed to get response from ${providerName}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return 'Response generation stopped.';
      }
      console.error('Error fetching AI response:', error);
      toast.error('Failed to get AI response. Please try again.');
      return 'Sorry, I encountered an error processing your request. Please try again.';
    } finally {
      setAbortController(null);
    }
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

    try {
      // Get AI response using the API
      const aiResponse = await fetchAIResponse(content);
      
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
    } catch (error) {
      console.error('Error in sendMessage:', error);
      
      // Update AI message with error
      const errorAiMessage: Message = {
        ...aiMessage,
        content: 'Sorry, an error occurred while generating a response.',
        isProcessing: false,
      };

      const errorConversation = {
        ...updatedConversation,
        messages: [
          ...updatedConversation.messages.slice(0, -1),
          errorAiMessage,
        ],
      };

      setCurrentConversation(errorConversation);
      setConversations((prev) =>
        prev.map((conv) => (conv.id === errorConversation.id ? errorConversation : conv))
      );
    } finally {
      setIsProcessing(false);
    }
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
    
    try {
      // Get AI response using the API
      const aiResponse = await fetchAIResponse(userMessage.content);
      
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
    } catch (error) {
      console.error('Error in regenerateLastResponse:', error);
      
      // Update AI message with error
      const errorAiMessage: Message = {
        ...aiMessage,
        content: 'Sorry, an error occurred while regenerating the response.',
        isProcessing: false,
      };
      
      const errorConversation = {
        ...updatedConversation,
        messages: [
          ...updatedConversation.messages.slice(0, -1),
          errorAiMessage,
        ],
      };
      
      setCurrentConversation(errorConversation);
      setConversations((prev) =>
        prev.map((conv) => (conv.id === errorConversation.id ? errorConversation : conv))
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const stopGenerating = () => {
    if (!isProcessing || !abortController) return;
    abortController.abort();
    setIsProcessing(false);
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
