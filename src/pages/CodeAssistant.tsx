
import React, { useState } from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Code, Download, Copy, Terminal, ArrowRight, CheckSquare, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const CodeAssistant = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [task, setTask] = useState("explain");
  const [result, setResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock processing
  const handleProcess = () => {
    if (!code.trim()) {
      toast.error("Te rugăm să adaugi cod pentru a continua");
      return;
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      // Mock results based on task
      let mockResult = "";
      
      switch (task) {
        case "explain":
          mockResult = `# Explicație cod\n\nAcest cod implementează:\n\n1. O funcție care calculează...\n2. O structură de date pentru...\n3. Un algoritm eficient pentru...`;
          break;
        case "optimize":
          mockResult = `# Cod optimizat\n\n\`\`\`${language}\n# Versiunea originală putea fi îmbunătățită astfel:\ndef optimized_function(x, y):\n    return x * y  # O implementare mai eficientă\n\`\`\``;
          break;
        case "debug":
          mockResult = `# Depanare\n\nAm găsit următoarele probleme:\n\n1. Linia 12: Posibilă împărțire cu zero\n2. Linia 20: Variabilă nedefininită 'result'`;
          break;
        default:
          mockResult = "Rezultatul analizei tale va apărea aici.";
      }
      
      setResult(mockResult);
      setIsProcessing(false);
      toast.success("Cod procesat cu succes!");
    }, 1500);
  };

  // Helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiat în clipboard");
  };

  return (
    <ChatLayout>
      <div className="container p-4 md:p-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2">Asistent de Cod</h1>
          <p className="text-muted-foreground">
            Analizează, explică, optimizează și depanează codul tău de matematică și programare
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Cod Sursă</h2>
              <div className="flex items-center gap-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Limbaj" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="c++">C++</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="r">R</SelectItem>
                    <SelectItem value="matlab">MATLAB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="relative">
              <Textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Introdu codul tău aici..."
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
            
            <div>
              <Label className="mb-2 block">Ce dorești să fac?</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <Button 
                  type="button" 
                  variant={task === "explain" ? "default" : "outline"} 
                  onClick={() => setTask("explain")}
                  className="justify-start"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Explică codul
                </Button>
                <Button 
                  type="button" 
                  variant={task === "optimize" ? "default" : "outline"}
                  onClick={() => setTask("optimize")}
                  className="justify-start"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Optimizează
                </Button>
                <Button 
                  type="button" 
                  variant={task === "debug" ? "default" : "outline"}
                  onClick={() => setTask("debug")}
                  className="justify-start"
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Debug
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={handleProcess}
              disabled={isProcessing} 
              className="w-full"
            >
              {isProcessing ? (
                <>Procesare...</>
              ) : (
                <>
                  <Terminal className="h-4 w-4 mr-2" />
                  Procesează Codul
                </>
              )}
            </Button>
          </div>
          
          {/* Result Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Rezultat</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(result)} disabled={!result}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiază
                </Button>
                <Button variant="outline" size="sm" disabled={!result}>
                  <Download className="h-4 w-4 mr-2" />
                  Descarcă
                </Button>
              </div>
            </div>
            
            <div className="bg-black/90 text-green-400 font-mono text-sm rounded-lg p-4 min-h-[300px] relative overflow-auto">
              {result ? (
                <pre className="whitespace-pre-wrap">{result}</pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Terminal className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-muted-foreground">Rezultatul va apărea aici după procesare</p>
                </div>
              )}
            </div>
            
            <div className="bg-muted/30 p-4 rounded-md border">
              <h3 className="font-medium mb-2 text-sm">Recomandări</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Pentru rezultate mai bune, asigură-te că codul este corect sintactic</span>
                </li>
                <li className="flex gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Adaugă comentarii pentru a explica intenția codului tău</span>
                </li>
                <li className="flex gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Poți importa codul din fișiere în panoul de chat principal</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default CodeAssistant;
