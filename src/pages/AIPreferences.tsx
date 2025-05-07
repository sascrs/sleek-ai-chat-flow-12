
import React, { useState } from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { useSettings } from '@/context/SettingsContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Settings, Key, Trash2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const AIPreferences = () => {
  const { aiProviders, updateProvider, setActiveProvider } = useSettings();
  const [apiKeys, setApiKeys] = useState<Record<string, string>>(() => {
    // Initialize with current API keys
    const initialKeys: Record<string, string> = {};
    aiProviders.forEach(provider => {
      initialKeys[provider.id] = provider.apiKey || '';
    });
    return initialKeys;
  });

  const handleApiKeyChange = (providerId: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [providerId]: value }));
  };

  const handleSaveApiKey = (providerId: string) => {
    const apiKey = apiKeys[providerId]?.trim();
    updateProvider(providerId, { apiKey });
    toast.success('API key has been saved');
  };

  const handleSetActive = (providerId: string) => {
    setActiveProvider(providerId);
  };

  return (
    <ChatLayout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Preferences</h1>
            <p className="text-muted-foreground">
              Configure AI models and set your API keys
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active AI Model</CardTitle>
              <CardDescription>
                Choose which AI model you want to use for generating responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {aiProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-9 w-9 rounded-full bg-accent flex items-center justify-center">
                        {provider.icon ? (
                          <img
                            src={provider.icon}
                            alt={provider.name}
                            className="h-5 w-5"
                          />
                        ) : (
                          <div className="h-5 w-5 rounded-full bg-primary/20 text-xs flex items-center justify-center text-primary font-medium">
                            {provider.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{provider.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {provider.description || `Configure ${provider.name} API settings`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {provider.isActive && (
                        <span className="text-xs flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full">
                          <CheckCircle className="h-3 w-3" />
                          Active
                        </span>
                      )}
                      <Switch
                        checked={provider.isActive}
                        onCheckedChange={() => handleSetActive(provider.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">API Keys</CardTitle>
              <CardDescription>
                Set up your API keys for each provider to use their services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {aiProviders.map((provider) => (
                  <div key={provider.id} className="space-y-3">
                    <Label htmlFor={`apiKey-${provider.id}`} className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      {provider.name} API Key
                    </Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          id={`apiKey-${provider.id}`}
                          type="password"
                          placeholder={`Enter your ${provider.name} API key`}
                          value={apiKeys[provider.id] || ''}
                          onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                          className="pr-9"
                        />
                        {apiKeys[provider.id] && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                            onClick={() => handleApiKeyChange(provider.id, '')}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                        )}
                      </div>
                      <Button
                        onClick={() => handleSaveApiKey(provider.id)}
                        disabled={!apiKeys[provider.id]}
                      >
                        Save
                      </Button>
                    </div>
                    {provider.id === 'openai' && (
                      <p className="text-xs text-muted-foreground">
                        You can get your OpenAI API key from{" "}
                        <a
                          href="https://platform.openai.com/account/api-keys"
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary underline underline-offset-2"
                        >
                          the OpenAI dashboard
                        </a>
                      </p>
                    )}
                    {provider.id === 'groq' && (
                      <p className="text-xs text-muted-foreground">
                        You can get your Groq API key from{" "}
                        <a
                          href="https://console.groq.com/keys"
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary underline underline-offset-2"
                        >
                          the Groq console
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ChatLayout>
  );
};

export default AIPreferences;
