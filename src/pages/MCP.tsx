
import React from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  LineChart, 
  Users, 
  Settings, 
  Database, 
  Code,
  FileText,
  Share2
} from 'lucide-react';

const MCP = () => {
  return (
    <ChatLayout>
      <div className="container px-4 py-6 md:py-10 max-w-full">
        <div className="flex flex-col w-full">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk">Master Control Panel</h1>
            <p className="text-muted-foreground mt-1">Gestionați aplicația și monitorizați performanța</p>
          </div>
          
          <Tabs defaultValue="dashboard" className="w-full">
            <div className="overflow-x-auto pb-1">
              <TabsList className="mb-4 bg-background/40 p-0.5 h-auto flex flex-wrap">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md py-1.5 px-2.5 m-0.5">
                  <LayoutDashboard className="h-4 w-4 mr-1.5" />
                  <span>Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md py-1.5 px-2.5 m-0.5">
                  <LineChart className="h-4 w-4 mr-1.5" />
                  <span>Analiză</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md py-1.5 px-2.5 m-0.5">
                  <Users className="h-4 w-4 mr-1.5" />
                  <span>Utilizatori</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md py-1.5 px-2.5 m-0.5">
                  <Settings className="h-4 w-4 mr-1.5" />
                  <span>Setări</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="dashboard" className="mt-0 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="overflow-hidden shadow-sm border-border/60 bg-card/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Users className="h-4 w-4 mr-2 text-indigo-500" />
                      Utilizatori activi
                    </CardTitle>
                    <CardDescription>Ultimele 30 de zile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">2,348</p>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      +12.3% față de luna trecută
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden shadow-sm border-border/60 bg-card/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Database className="h-4 w-4 mr-2 text-violet-500" />
                      Spațiu de stocare
                    </CardTitle>
                    <CardDescription>Utilizat / Total</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">4.8 GB / 10 GB</p>
                    <p className="text-sm text-amber-500 flex items-center mt-1">
                      48% utilizat
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden shadow-sm border-border/60 bg-card/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Code className="h-4 w-4 mr-2 text-blue-500" />
                      Operațiuni API
                    </CardTitle>
                    <CardDescription>Ultimele 24 de ore</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">42,891</p>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      99.8% rata de succes
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="col-span-1 lg:col-span-2 overflow-hidden shadow-sm border-border/60 bg-card/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <LineChart className="h-4 w-4 mr-2 text-primary" />
                      Performanță săptămânală
                    </CardTitle>
                    <CardDescription>Metrici cheie de performanță</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                      <p className="text-muted-foreground">Graficele vor fi afișate aici</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1 overflow-hidden shadow-sm border-border/60 bg-card/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-violet-500" />
                      Activitate recentă
                    </CardTitle>
                    <CardDescription>Ultimele operațiuni</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Array.from({length: 4}).map((_, i) => (
                        <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0">
                          <div className="flex items-center">
                            <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mr-2.5">
                              <Share2 className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Export date</p>
                              <p className="text-xs text-muted-foreground">Acum {15 + i} min</p>
                            </div>
                          </div>
                          <div className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs">Succes</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analiză</CardTitle>
                  <CardDescription>Vizualizați statisticile detaliate ale aplicației.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Conținutul pentru pagina de analiză va fi implementat ulterior.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Utilizatori</CardTitle>
                  <CardDescription>Gestionați utilizatorii și permisiunile acestora.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Conținutul pentru pagina de utilizatori va fi implementat ulterior.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Setări</CardTitle>
                  <CardDescription>Configurați preferințele aplicației.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Conținutul pentru pagina de setări va fi implementat ulterior.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ChatLayout>
  );
};

export default MCP;
