
import React from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Archive, Search, MessageSquare, Calculator, Clock, ChevronRight, Trash2 } from 'lucide-react';

const ArchivedChats = () => {
  // Mock data for archived chats
  const archivedChats = [
    {
      id: 1,
      title: "Integrarea funcțiilor complexe",
      preview: "Am nevoie de ajutor cu calculul integralei...",
      date: "10 Mai 2025",
      category: "Matematică",
      messages: 12
    },
    {
      id: 2,
      title: "Algoritm de sortare în Python",
      preview: "Cum pot implementa eficient un algoritm de sortare...",
      date: "8 Mai 2025",
      category: "Programare",
      messages: 8
    },
    {
      id: 3,
      title: "Teoria relativității",
      preview: "Explică-mi conceptele cheie din teoria relativității...",
      date: "3 Mai 2025",
      category: "Fizică",
      messages: 15
    }
  ];

  return (
    <ChatLayout>
      <div className="container p-4 md:p-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2">Conversații Arhivate</h1>
            <p className="text-muted-foreground">Accesați și gestionați conversațiile dvs. arhivate</p>
          </div>
          
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Caută conversații..." className="pl-9 w-full sm:w-[250px]" />
          </div>
        </div>
        
        {archivedChats.length > 0 ? (
          <div className="space-y-4">
            {archivedChats.map((chat) => (
              <div 
                key={chat.id}
                className="border border-border/60 rounded-lg p-4 bg-background shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center">
                      <Calculator className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{chat.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{chat.preview}</p>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
                
                <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {chat.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {chat.messages} mesaje
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Șterge</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                      <Archive className="h-3.5 w-3.5" />
                      <span>Dezarhivează</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-border/60 p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Archive className="h-8 w-8 text-primary/70" />
            </div>
            <h3 className="text-lg font-medium mb-2">Nicio conversație arhivată</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
              Conversațiile arhivate vor apărea aici. Poți arhiva convesațiile din ecranul principal.
            </p>
          </div>
        )}
        
        <div className="mt-8 bg-muted/30 p-4 rounded-md border text-sm">
          <h3 className="font-medium mb-2">Despre conversațiile arhivate</h3>
          <p className="text-muted-foreground">
            Conversațiile arhivate sunt stocate în siguranță și pot fi accesate oricând. 
            Acestea nu apar în lista principală de conversații, dar conținutul lor rămâne intact.
          </p>
        </div>
      </div>
    </ChatLayout>
  );
};

export default ArchivedChats;
