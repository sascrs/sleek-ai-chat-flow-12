
import React, { useState } from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Image, Loader2, RefreshCw, Sparkles, Palette } from 'lucide-react';
import { toast } from 'sonner';

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  
  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Te rugăm să introduci un prompt");
      return;
    }
    
    setGenerating(true);
    
    // Mock image generation
    setTimeout(() => {
      // In a real app, these would be URLs returned from an AI image generation API
      const mockImages = [
        "https://images.unsplash.com/photo-1682686580003-22d3d65399a8?q=80&w=1740&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1693202800743-dee5e74e341a?q=80&w=1932&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1682685797898-6d7587784313?q=80&w=1740&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1693161305277-b6f7de626b30?q=80&w=1932&auto=format&fit=crop"
      ];
      
      setGeneratedImages(mockImages);
      setGenerating(false);
      toast.success("Imagini generate cu succes!");
    }, 2000);
  };

  return (
    <ChatLayout>
      <div className="container p-4 md:p-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2">Generare de Imagini</h1>
          <p className="text-muted-foreground">Creați imagini bazate pe concepte matematice, algoritmi și ecuații</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-card border-border/60">
              <CardContent className="p-4 md:p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt</Label>
                  <Input 
                    id="prompt"
                    placeholder="Descrie imaginea dorită..." 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="h-20 resize-none py-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Exemplu: "Vizualizare 3D a Teoremei lui Pitagora", "Model de rețea neuronală cu gradient colorat"
                  </p>
                </div>
                
                <div className="space-y-6 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Complexitate</Label>
                      <span className="text-xs text-muted-foreground">Medie</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} className="py-1.5" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="style">Stil</Label>
                    <Select defaultValue="realistic">
                      <SelectTrigger id="style">
                        <SelectValue placeholder="Alege un stil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realistic">Realistic</SelectItem>
                        <SelectItem value="abstract">Abstract</SelectItem>
                        <SelectItem value="3d">3D Render</SelectItem>
                        <SelectItem value="cartoon">Cartoon</SelectItem>
                        <SelectItem value="sketch">Schițe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="size">Format</Label>
                    <Select defaultValue="square">
                      <SelectTrigger id="size">
                        <SelectValue placeholder="Alege un format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Pătrat (1:1)</SelectItem>
                        <SelectItem value="portrait">Portret (2:3)</SelectItem>
                        <SelectItem value="landscape">Landscape (3:2)</SelectItem>
                        <SelectItem value="wide">Wide (16:9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={handleGenerate} 
                    disabled={generating} 
                    className="w-full"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generare...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generează Imagini
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 bg-muted/30 p-4 rounded-md border text-sm">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Sfaturi pentru prompt-uri eficiente
              </h3>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Descrieți detalii vizuale specifice</li>
                <li>Menționați stilul artistic dorit</li>
                <li>Includeți elemente matematice relevante</li>
                <li>Specificați perspectiva sau unghiul de vedere</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            {generatedImages.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedImages.map((img, i) => (
                  <div key={i} className="group relative aspect-square rounded-lg overflow-hidden border border-border/60 bg-black/5">
                    <img 
                      src={img} 
                      alt={`Generated image ${i+1}`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                      <Button size="sm" variant="secondary" className="shadow-md">
                        <Download className="h-4 w-4 mr-2" />
                        Descarcă
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-white/5 backdrop-blur-md rounded-xl border border-border/60 p-8 text-center">
                <Image className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Nicio imagine generată</h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-md">
                  Adăugați un prompt și setările dorite, apoi apăsați butonul Generează pentru a crea imagini.
                </p>
              </div>
            )}
            
            {generatedImages.length > 0 && (
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => setGeneratedImages([])}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Resetează
                </Button>
                <Button variant="default">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Îmbunătățește imaginile
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default ImageGeneration;
