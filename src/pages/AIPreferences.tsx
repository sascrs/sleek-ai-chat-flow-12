
import React, { useState } from 'react';
import { Settings, AlertTriangle, CheckCircle, Plus, Key, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSettings, AIProvider } from '@/context/SettingsContext';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export default function AIPreferences() {
  const { aiProviders, updateProvider, setActiveProvider, addProvider, removeProvider } = useSettings();
  const [newProviderName, setNewProviderName] = useState('');
  const [showNewProviderForm, setShowNewProviderForm] = useState(false);

  const handleUpdateApiKey = (id: string, apiKey: string) => {
    updateProvider(id, { apiKey });
  };

  const handleToggleActive = (id: string) => {
    setActiveProvider(id);
  };

  const handleAddProvider = () => {
    if (newProviderName.trim() === '') {
      toast.error('Please enter a name for the provider');
      return;
    }

    const newProvider: AIProvider = {
      id: uuidv4(),
      name: newProviderName,
      apiKey: '',
      isActive: false,
      description: 'Custom AI provider'
    };

    addProvider(newProvider);
    setNewProviderName('');
    setShowNewProviderForm(false);
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex items-center gap-2 mb-8">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">AI Preferences</h1>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Model Providers</h2>
        <p className="text-muted-foreground">
          Configure API keys for various AI model providers to use with PyThaGO.AI
        </p>
      </div>

      <div className="grid gap-6">
        {aiProviders.map((provider) => (
          <Card key={provider.id} className="overflow-hidden backdrop-blur-sm bg-white/5 border border-border/50">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex gap-2 items-center">
                  {provider.name}
                  {provider.isActive && (
                    <span className="inline-flex items-center text-xs font-medium ml-1.5 py-1 px-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </span>
                  )}
                </CardTitle>
                <Switch 
                  checked={provider.isActive} 
                  onCheckedChange={() => handleToggleActive(provider.id)} 
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              <CardDescription>{provider.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor={`${provider.id}-api-key`} className="flex items-center gap-1.5">
                  <Key className="h-3.5 w-3.5" /> API Key
                </Label>
                <div className="flex gap-2">
                  <Input
                    id={`${provider.id}-api-key`}
                    type="password"
                    value={provider.apiKey}
                    onChange={(e) => handleUpdateApiKey(provider.id, e.target.value)}
                    className="font-mono"
                    placeholder={`Enter ${provider.name} API key`}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => removeProvider(provider.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {provider.apiKey === '' && (
                  <p className="text-xs flex items-center gap-1 text-amber-500 mt-1.5">
                    <AlertTriangle className="h-3 w-3" />
                    No API key set
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {showNewProviderForm ? (
          <Card className="overflow-hidden bg-white/5 border border-dashed border-primary/30">
            <CardHeader>
              <CardTitle>Add Custom Provider</CardTitle>
              <CardDescription>
                Add a custom AI model provider
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-provider-name">Provider Name</Label>
                <Input
                  id="new-provider-name"
                  value={newProviderName}
                  onChange={(e) => setNewProviderName(e.target.value)}
                  placeholder="Enter provider name"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowNewProviderForm(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddProvider}>
                Add Provider
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Button 
            variant="outline" 
            className="border-dashed border-primary/40 hover:border-primary flex gap-1"
            onClick={() => setShowNewProviderForm(true)}
          >
            <Plus className="h-4 w-4" /> Add Custom Provider
          </Button>
        )}
      </div>

      <div className="mt-10 p-4 rounded-lg border border-amber-200/30 bg-amber-50/10 text-amber-800 dark:text-amber-300">
        <div className="flex gap-2 items-start">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium mb-1">Security Note</h3>
            <p className="text-sm">
              API keys are stored locally in your browser. Never share your API keys or private information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
