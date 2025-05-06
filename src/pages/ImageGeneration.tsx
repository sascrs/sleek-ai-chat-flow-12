
import React, { useState } from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Image, Download, Share2, RefreshCw, Wand2, PlusCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [imageSize, setImageSize] = useState(512);
  const [imageStyle, setImageStyle] = useState('realistic');
  
  // Example generated images data
  const generatedImages = [
    { id: 1, url: 'https://picsum.photos/512', prompt: 'A beautiful sunset over mountains' },
    { id: 2, url: 'https://picsum.photos/512', prompt: 'Futuristic cityscape with flying cars' },
    { id: 3, url: 'https://picsum.photos/512', prompt: 'Serene forest with a waterfall' },
    { id: 4, url: 'https://picsum.photos/512', prompt: 'Abstract digital art with vibrant colors' },
  ];
  
  const styles = [
    { id: 'realistic', name: 'Realistic', description: 'Photorealistic style' },
    { id: 'anime', name: 'Anime', description: 'Japanese animation style' },
    { id: 'digital-art', name: 'Digital Art', description: '3D rendered style' },
    { id: 'oil-painting', name: 'Oil Painting', description: 'Classic art style' },
    { id: 'watercolor', name: 'Watercolor', description: 'Soft watercolor style' },
    { id: 'pixel-art', name: 'Pixel Art', description: 'Retro game style' },
  ];
  
  const handleGenerate = () => {
    if (!prompt) {
      toast({
        title: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }
    
    setGenerating(true);
    // Simulate image generation
    setTimeout(() => {
      setGenerating(false);
      toast({
        title: "Image generated successfully",
        description: "Your image is ready to view and download.",
      });
    }, 3000);
  };

  return (
    <ChatLayout>
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold font-space-grotesk">AI Image Generation</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm p-4 mb-6">
              <h2 className="text-lg font-semibold mb-3 font-space-grotesk">Create New Image</h2>
              <Textarea 
                placeholder="Describe the image you want to generate..." 
                className="min-h-24 mb-4 bg-background/70 shadow-inner" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Image Size: {imageSize}x{imageSize}</label>
                </div>
                <Slider 
                  defaultValue={[512]} 
                  max={1024} 
                  min={256} 
                  step={128}
                  onValueChange={(value) => setImageSize(value[0])} 
                  className="mb-6"
                />
                
                <h3 className="text-sm font-medium mb-3">Style</h3>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {styles.map((style) => (
                    <Button
                      key={style.id}
                      variant={imageStyle === style.id ? "secondary" : "outline"}
                      className="justify-start h-auto py-2 px-3"
                      onClick={() => setImageStyle(style.id)}
                    >
                      <div className="text-left">
                        <div className="font-medium text-xs">{style.name}</div>
                        <div className="text-[10px] text-muted-foreground">{style.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full rounded-xl bg-gradient-to-r from-primary/95 to-primary/85 hover:from-primary hover:to-primary/90 shadow-lg hover:shadow-primary/25 transition-all btn-3d"
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="gallery" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="gallery" className="rounded-lg">Gallery</TabsTrigger>
                <TabsTrigger value="history" className="rounded-lg">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="gallery" className="mt-0">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-border/40 flex justify-between items-center">
                    <h2 className="font-semibold">Generated Images</h2>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
                      New Folder
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-[600px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                      {generatedImages.map((img) => (
                        <div key={img.id} className="group relative rounded-lg overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all">
                          <img 
                            src={img.url} 
                            alt={img.prompt} 
                            className="w-full aspect-square object-cover" 
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <p className="text-sm text-white line-clamp-2">{img.prompt}</p>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg bg-background/80 backdrop-blur-sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg bg-background/80 backdrop-blur-sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="mt-0">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm p-4">
                  <h3 className="text-lg font-medium mb-4">Your Generation History</h3>
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-border/40 bg-background/50">
                        <div className="h-16 w-16 rounded bg-muted flex items-center justify-center">
                          <Image className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Generated Image #{i + 1}</p>
                          <p className="text-xs text-muted-foreground">Created {i + 1} day{i > 0 ? 's' : ''} ago</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default ImageGeneration;
