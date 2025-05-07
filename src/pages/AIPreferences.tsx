
import React from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { useSettings } from '@/context/SettingsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Check, AlertTriangle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const AIPreferences = () => {
  const { aiProviders, updateProvider, setActiveProvider } = useSettings();

  const handleSaveApiKey = (id: string, newKey: string) => {
    updateProvider(id, { apiKey: newKey });
    toast.success(`Cheie API actualizată cu succes!`);
  };

  const handleActivateProvider = (id: string) => {
    setActiveProvider(id);
  };

  const testConnection = (id: string) => {
    const provider = aiProviders.find(p => p.id === id);
    if (provider && provider.apiKey) {
      toast.success(`Conexiunea cu ${provider.name} este funcțională`);
    } else {
      toast.error(`Nu s-a putut conecta. Verificați cheia API.`);
    }
  };

  return (
    <ChatLayout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="container p-4 md:p-6 max-w-4xl mx-auto pb-20">
          <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2">Preferințe AI</h1>
          <p className="text-muted-foreground mb-6">Configurați furnizorii și preferințele AI</p>
          
          <div className="grid gap-6">
            {aiProviders.map((provider) => (
              <Card key={provider.id} className={`border ${provider.isActive ? 'border-primary/50 shadow-md shadow-primary/10' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{provider.name}</CardTitle>
                      <CardDescription>{provider.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`activate-${provider.id}`} className="text-sm text-muted-foreground">
                        Activ
                      </Label>
                      <Switch 
                        id={`activate-${provider.id}`}
                        checked={provider.isActive} 
                        onCheckedChange={() => handleActivateProvider(provider.id)} 
                      />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`api-key-${provider.id}`}>Cheie API</Label>
                      <div className="flex gap-2">
                        <Input 
                          id={`api-key-${provider.id}`}
                          type="password" 
                          placeholder={provider.apiKey ? "••••••••••••••••••••" : "Introduceți cheia API"} 
                          defaultValue={provider.apiKey} 
                          className="flex-1"
                        />
                        <Button 
                          onClick={() => {
                            const input = document.getElementById(`api-key-${provider.id}`) as HTMLInputElement;
                            handleSaveApiKey(provider.id, input.value);
                          }}
                          size="sm"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Salvează
                        </Button>
                      </div>
                    </div>
                    
                    {provider.isActive && !provider.apiKey && (
                      <div className="bg-amber-500/10 text-amber-600 dark:text-amber-400 p-3 rounded-md flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Atenție</p>
                          <p>Acest furnizor este activ dar nu are setată o cheie API. Unele funcții ar putea să nu funcționeze corespunzător.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => testConnection(provider.id)}
                    disabled={!provider.apiKey}
                    className="w-full sm:w-auto"
                  >
                    Testează conexiunea
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 bg-muted/30 p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Despre API Keys</h3>
            <p className="text-sm text-muted-foreground">
              Cheile API sunt stocate doar în browserul dvs. local și nu sunt partajate cu serverele noastre. 
              Pentru a obține chei API, vizitați site-urile oficiale ale furnizorilor respectivi.
            </p>
          </div>
        </div>
      </ScrollArea>
    </ChatLayout>
  );
};

export default AIPreferences;
