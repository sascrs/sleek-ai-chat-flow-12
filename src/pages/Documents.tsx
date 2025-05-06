
import React from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Folder, Download, Share2, MoreVertical } from 'lucide-react';

const Documents = () => {
  // Sample document data
  const documents = [
    { id: 1, name: 'Research Paper Draft', type: 'pdf', date: '2 days ago', size: '4.2 MB' },
    { id: 2, name: 'Project Proposal', type: 'docx', date: '1 week ago', size: '1.8 MB' },
    { id: 3, name: 'Meeting Notes', type: 'txt', date: 'Yesterday', size: '256 KB' },
    { id: 4, name: 'Financial Report', type: 'xlsx', date: '3 days ago', size: '3.7 MB' },
    { id: 5, name: 'Product Specifications', type: 'pdf', date: '4 days ago', size: '2.9 MB' },
  ];

  return (
    <ChatLayout>
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold font-space-grotesk">My Documents</h1>
          <Button className="rounded-xl bg-gradient-to-r from-primary/95 to-primary/85 hover:from-primary hover:to-primary/90 shadow-lg hover:shadow-primary/25 transition-all btn-3d">
            <Plus className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/40 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Folder className="h-5 w-5" />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="font-medium mb-1">Recent Documents</h3>
            <p className="text-sm text-muted-foreground mb-3">Quick access to your recent files</p>
            <div className="text-xs text-muted-foreground">23 files</div>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/40 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                <Folder className="h-5 w-5" />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="font-medium mb-1">Shared with Me</h3>
            <p className="text-sm text-muted-foreground mb-3">Documents shared by others</p>
            <div className="text-xs text-muted-foreground">8 files</div>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/40 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
                <Folder className="h-5 w-5" />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="font-medium mb-1">AI Generated</h3>
            <p className="text-sm text-muted-foreground mb-3">Documents created with AI</p>
            <div className="text-xs text-muted-foreground">12 files</div>
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border/40">
            <h2 className="font-semibold">Recent Documents</h2>
          </div>
          
          <ScrollArea className="h-[400px]">
            <div className="p-4">
              <table className="w-full">
                <thead className="text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="font-medium text-left pb-3 pl-2">Name</th>
                    <th className="font-medium text-left pb-3 hidden md:table-cell">Date Modified</th>
                    <th className="font-medium text-left pb-3 hidden md:table-cell">Size</th>
                    <th className="font-medium text-right pb-3 pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-muted/50 transition-colors">
                      <td className="py-3 pl-2">
                        <div className="flex items-center">
                          <div className="bg-primary/10 rounded p-2 mr-3">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-xs text-muted-foreground">.{doc.type} file</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 hidden md:table-cell text-muted-foreground text-sm">{doc.date}</td>
                      <td className="py-3 hidden md:table-cell text-muted-foreground text-sm">{doc.size}</td>
                      <td className="py-3 pr-2">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </div>
      </div>
    </ChatLayout>
  );
};

export default Documents;
