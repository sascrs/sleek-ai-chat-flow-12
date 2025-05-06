
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

export interface AIProvider {
  id: string;
  name: string;
  apiKey: string;
  isActive: boolean;
  icon?: string;
  description?: string;
}

interface SettingsContextType {
  aiProviders: AIProvider[];
  addProvider: (provider: AIProvider) => void;
  updateProvider: (id: string, updates: Partial<AIProvider>) => void;
  removeProvider: (id: string) => void;
  setActiveProvider: (id: string) => void;
  getActiveProvider: () => AIProvider | undefined;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const defaultProviders: AIProvider[] = [
  {
    id: 'groq',
    name: 'Groq',
    apiKey: '', // Empty by default
    isActive: true,
    description: 'High-performance AI models with ultra-fast response times',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    apiKey: '',
    isActive: false,
    description: 'Industry-leading models like GPT-4 and GPT-3.5 Turbo',
  },
  {
    id: 'llama',
    name: 'Llama (Meta)',
    apiKey: '',
    isActive: false,
    description: 'Open access large language models from Meta',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    apiKey: '',
    isActive: false,
    description: 'Advanced AI models with strong reasoning capabilities',
  },
];

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [aiProviders, setAiProviders] = useState<AIProvider[]>(() => {
    const savedProviders = localStorage.getItem('aiProviders');
    return savedProviders ? JSON.parse(savedProviders) : defaultProviders;
  });

  useEffect(() => {
    localStorage.setItem('aiProviders', JSON.stringify(aiProviders));
  }, [aiProviders]);

  const addProvider = (provider: AIProvider) => {
    setAiProviders((prev) => [...prev, provider]);
    toast.success(`Added ${provider.name} as a provider`);
  };

  const updateProvider = (id: string, updates: Partial<AIProvider>) => {
    setAiProviders((prev) =>
      prev.map((provider) =>
        provider.id === id ? { ...provider, ...updates } : provider
      )
    );
    toast.success(`Updated ${updates.name || 'provider'} settings`);
  };

  const removeProvider = (id: string) => {
    const providerName = aiProviders.find(p => p.id === id)?.name;
    setAiProviders((prev) => prev.filter((provider) => provider.id !== id));
    toast.success(`Removed ${providerName || 'provider'}`);
  };

  const setActiveProvider = (id: string) => {
    setAiProviders((prev) =>
      prev.map((provider) => ({
        ...provider,
        isActive: provider.id === id,
      }))
    );
    const providerName = aiProviders.find(p => p.id === id)?.name;
    toast.success(`Set ${providerName} as active provider`);
  };

  const getActiveProvider = () => {
    return aiProviders.find((provider) => provider.isActive);
  };

  return (
    <SettingsContext.Provider
      value={{
        aiProviders,
        addProvider,
        updateProvider,
        removeProvider,
        setActiveProvider,
        getActiveProvider,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
