
import React from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { Button } from '@/components/ui/button';
import { FileText, Upload, FolderOpen, Search, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Documents = () => {
  return (
    <ChatLayout>
      <div className="container p-4 md:p-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2">Documente</h1>
            <p className="text-muted-foreground">Încărcați și gestionați documentele dvs. pentru analiză.</p>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button className="flex-1 sm:flex-none">
              <PlusCircle className="h-4 w-4 mr-2" />
              Încarcă document
            </Button>
          </div>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Caută în documente..." className="pl-9" />
        </div>
        
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-border/60 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-primary/70" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nu există documente</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Începeți prin încărcarea unui document sau prin tragerea și plasarea fișierelor în această zonă.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Încarcă fișier
            </Button>
            <Button variant="outline">
              <FolderOpen className="h-4 w-4 mr-2" />
              Alege din calculator
            </Button>
          </div>
        </div>
        
        <div className="mt-8 bg-muted/30 p-4 rounded-md border text-sm">
          <h3 className="font-medium mb-2">Despre funcționalitatea de documente</h3>
          <p className="text-muted-foreground mb-2">
            PyThaGO.AI poate analiza documente PDF, TXT, DOCX și multe alte formate pentru a:
          </p>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            <li>Extrage informații matematice și formule</li>
            <li>Ajuta la înțelegerea conceptelor complexe</li>
            <li>Răspunde la întrebări bazate pe conținutul documentului</li>
            <li>Crea rezumate și extrage punctele cheie</li>
          </ul>
        </div>
      </div>
    </ChatLayout>
  );
};

export default Documents;
