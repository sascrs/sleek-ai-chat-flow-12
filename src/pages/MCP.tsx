
import React, { useState } from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Calculator, Code, Network, GitBranch, Plus, Zap, Upload } from 'lucide-react';
import { toast } from 'sonner';

const MCP = () => {
  const [activeProject, setActiveProject] = useState('math-engine');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock submission
    setTimeout(() => {
      toast.success('Proiect actualizat cu succes!');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <ChatLayout>
      <div className="container p-4 md:p-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2">MCP (Model Control Panel)</h1>
          <p className="text-muted-foreground">Control avansat al modulelor AI și proiectele personalizate</p>
        </div>
        
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="projects" className="flex items-center gap-1.5">
              <LayoutDashboard className="h-4 w-4" />
              <span>Proiecte</span>
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-1.5">
              <Network className="h-4 w-4" />
              <span>Modele</span>
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-1.5">
              <GitBranch className="h-4 w-4" />
              <span>Personalizare</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className={`cursor-pointer ${activeProject === 'math-engine' ? 'border-primary/50' : ''}`}
                onClick={() => setActiveProject('math-engine')}
              >
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 h-8 w-8 rounded-md flex items-center justify-center mb-2">
                    <Calculator className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-base">Motor Matematic</CardTitle>
                  <CardDescription>Model specializat pentru calcule și formule</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2">
                  <p className="text-xs text-muted-foreground">Actualizat: 9 Mai</p>
                </CardFooter>
              </Card>
              
              <Card className={`cursor-pointer ${activeProject === 'code-assist' ? 'border-primary/50' : ''}`}
                onClick={() => setActiveProject('code-assist')}
              >
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 h-8 w-8 rounded-md flex items-center justify-center mb-2">
                    <Code className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-base">Asistent Cod</CardTitle>
                  <CardDescription>Model pentru debug și generare cod</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2">
                  <p className="text-xs text-muted-foreground">Actualizat: 7 Mai</p>
                </CardFooter>
              </Card>
              
              <Card className="cursor-pointer border-dashed border-border/70 flex flex-col items-center justify-center py-8">
                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="font-medium text-sm">Adaugă proiect nou</p>
                <p className="text-xs text-muted-foreground mt-1">Creează un model personalizat</p>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Configurație Proiect</CardTitle>
                <CardDescription>Editează setările pentru proiectul selectat</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Nume proiect</Label>
                    <Input id="project-name" defaultValue="Motor Matematic" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="project-description">Descriere</Label>
                    <Textarea id="project-description" defaultValue="Un model specializat în rezolvarea problemelor matematice și explicarea conceptelor" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="system-prompt">Prompt de sistem</Label>
                    <Textarea 
                      id="system-prompt" 
                      className="min-h-[120px]" 
                      defaultValue="Ești PyThaGO.AI, un asistent specializat în matematică. Oferă răspunsuri detaliate, pas cu pas, pentru probleme matematice. Include formule și explicații clare. Folosește notația matematică corectă."
                    />
                    <p className="text-xs text-muted-foreground">
                      Acest prompt îi spune modelului cum să se comporte și ce tip de răspunsuri să ofere
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperatură</Label>
                      <Input id="temperature" type="number" min="0" max="1" step="0.1" defaultValue="0.7" />
                      <p className="text-xs text-muted-foreground">
                        Controlează creativitatea (0 = determinist, 1 = creativ)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-tokens">Tokeni maximi</Label>
                      <Input id="max-tokens" type="number" min="100" max="4000" step="100" defaultValue="1000" />
                      <p className="text-xs text-muted-foreground">
                        Lungimea maximă a răspunsului generat
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="active">Model activ</Label>
                      <p className="text-xs text-muted-foreground">Activează sau dezactivează acest model</p>
                    </div>
                    <Switch id="active" defaultChecked />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Resetează</Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? (
                    <>Salvare...</>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-1.5" />
                      Salvează modificările
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="models">
            <Card>
              <CardHeader>
                <CardTitle>Modele AI Disponibile</CardTitle>
                <CardDescription>Gestionează și fă fine-tuning modelelor AI disponibile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Această secțiune permite controlul avansat al modelelor AI și customizarea parametrilor specifici.
                    Cu un abonament Premium, poți face fine-tuning și personaliza modelele pentru performanță optimă.
                  </p>
                  
                  <div className="relative border rounded-md p-6 flex flex-col items-center justify-center bg-muted/30">
                    <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium mb-1">Fine-tuning</h3>
                    <p className="text-sm text-muted-foreground text-center mb-3 max-w-md">
                      Încarcă date pentru a personaliza modelele pentru nevoile tale specifice
                    </p>
                    <Button variant="outline">Încarcă date de fine-tuning</Button>
                    <div className="absolute top-3 right-3 bg-premium/20 text-premium px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Premium
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="custom">
            <Card>
              <CardHeader>
                <CardTitle>Setări Avansate</CardTitle>
                <CardDescription>Personalizează funcționalitatea și parametrii de bază ai asistentului</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Această secțiune vă permite să ajustați comportamentul și funcționalitatea modelului în mod avansat.
                    Aceste setări sunt disponibile doar pentru utilizatorii Premium.
                  </p>
                  
                  <div className="bg-muted/30 p-4 rounded-md border text-center">
                    <p className="text-sm">Pentru a accesa aceste funcții avansate, vă rugăm să faceți upgrade la un abonament Premium.</p>
                    <Button className="mt-4 premium-button">
                      <Zap className="h-4 w-4 mr-2" />
                      Activează Premium
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ChatLayout>
  );
};

export default MCP;
