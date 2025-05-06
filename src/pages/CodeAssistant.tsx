
import React, { useState } from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Code, Copy, Check, BookOpen, Play, Plus, MoreVertical } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CodeAssistant = () => {
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState('');
  
  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const sampleCode = `function calculateFibonacci(n) {
  if (n <= 1) return n;
  
  let a = 0;
  let b = 1;
  let result;
  
  for (let i = 2; i <= n; i++) {
    result = a + b;
    a = b;
    b = result;
  }
  
  return b;
}

// Calculate the first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`Fibonacci(\${i}) = \${calculateFibonacci(i)}\`);
}`;

  const templates = [
    { id: 1, name: 'React Component', language: 'jsx', description: 'Create a React functional component' },
    { id: 2, name: 'API Endpoint', language: 'js', description: 'Create an Express.js API endpoint' },
    { id: 3, name: 'Database Query', language: 'sql', description: 'Generate SQL database queries' },
    { id: 4, name: 'CSS Animation', language: 'css', description: 'Create CSS animations and transitions' },
  ];

  return (
    <ChatLayout>
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold font-space-grotesk">Code Assistant</h1>
          <Button className="rounded-xl bg-gradient-to-r from-primary/95 to-primary/85 hover:from-primary hover:to-primary/90 shadow-lg hover:shadow-primary/25 transition-all btn-3d">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4 font-space-grotesk">Ask Coding Question</h2>
              <div className="space-y-4">
                <Textarea 
                  placeholder="Describe what code you want to generate..." 
                  className="min-h-24 bg-background/70 shadow-inner" 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Language</label>
                    <Select defaultValue="javascript">
                      <SelectTrigger className="bg-background/70">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="csharp">C#</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Framework</label>
                    <Select defaultValue="react">
                      <SelectTrigger className="bg-background/70">
                        <SelectValue placeholder="Select framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vue">Vue.js</SelectItem>
                        <SelectItem value="angular">Angular</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  className="w-full font-medium"
                  disabled={!question}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Generate Code
                </Button>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm p-4">
              <h3 className="font-medium mb-3">Code Templates</h3>
              <ScrollArea className="h-[280px] pr-4">
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div 
                      key={template.id} 
                      className="p-3 rounded-lg border border-border/40 bg-background/50 hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-sm">{template.name}</div>
                        <div className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">{template.language}</div>
                      </div>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="editor" className="rounded-lg">Code Editor</TabsTrigger>
                <TabsTrigger value="output" className="rounded-lg">Output</TabsTrigger>
                <TabsTrigger value="docs" className="rounded-lg">Documentation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="editor" className="mt-0">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between p-3 border-b border-border/40 bg-muted/30">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-destructive mr-2"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-3"></div>
                      <span className="text-xs font-medium">fibonacci.js</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <ScrollArea className="h-[600px]">
                    <pre className="p-4 text-sm font-mono overflow-x-auto">
                      <code>{sampleCode}</code>
                    </pre>
                  </ScrollArea>
                </div>
              </TabsContent>
              
              <TabsContent value="output" className="mt-0">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm overflow-hidden">
                  <div className="p-3 border-b border-border/40 bg-muted/30">
                    <div className="text-xs font-medium">Console Output</div>
                  </div>
                  <ScrollArea className="h-[600px] bg-black/90">
                    <pre className="p-4 text-sm font-mono text-green-400">
                      <code>{`> Running fibonacci.js...

Fibonacci(0) = 0
Fibonacci(1) = 1
Fibonacci(2) = 1
Fibonacci(3) = 2
Fibonacci(4) = 3
Fibonacci(5) = 5
Fibonacci(6) = 8
Fibonacci(7) = 13
Fibonacci(8) = 21
Fibonacci(9) = 34

> Process completed with exit code 0 (0.042s)`}</code>
                    </pre>
                  </ScrollArea>
                </div>
              </TabsContent>
              
              <TabsContent value="docs" className="mt-0">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm">
                  <div className="p-4 border-b border-border/40">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-primary" />
                      <h2 className="font-semibold">JavaScript Documentation</h2>
                    </div>
                  </div>
                  <ScrollArea className="h-[600px]">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">Fibonacci Sequence</h3>
                      <p className="mb-4 text-muted-foreground">
                        The Fibonacci sequence is a series of numbers where each number is the sum of the two 
                        preceding ones, usually starting with 0 and 1.
                      </p>
                      
                      <h4 className="font-medium mb-2">Mathematical Definition</h4>
                      <div className="p-3 bg-muted/30 rounded-md mb-4 font-mono">
                        F(0) = 0<br />
                        F(1) = 1<br />
                        F(n) = F(n-1) + F(n-2) for n &gt; 1
                      </div>
                      
                      <h4 className="font-medium mb-2">Implementation Notes</h4>
                      <ul className="list-disc pl-5 mb-4 space-y-2 text-muted-foreground">
                        <li>The iterative approach used in the example has O(n) time complexity</li>
                        <li>A recursive implementation would be simpler but less efficient (exponential complexity)</li>
                        <li>For very large numbers, consider using BigInt in JavaScript</li>
                      </ul>
                      
                      <h4 className="font-medium mb-2">Common Applications</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Dynamic programming examples</li>
                        <li>Natural patterns and growth models</li>
                        <li>Optimization algorithms</li>
                        <li>Computer science education</li>
                      </ul>
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default CodeAssistant;
