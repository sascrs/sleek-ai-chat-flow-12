
import React from 'react';
import { ChatLayout } from '@/components/ChatLayout';
import { Separator } from '@/components/ui/separator';
import { Settings, LayoutDashboard } from 'lucide-react';

const MCP = () => {
  return (
    <ChatLayout>
      <div className="container mx-auto max-w-5xl p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">MCP Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Settings</span>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card text-card-foreground shadow p-4 transition-all hover:shadow-md">
            <div className="flex flex-col space-y-1.5 pb-4">
              <h3 className="text-lg font-semibold leading-none tracking-tight">Systems Overview</h3>
              <p className="text-sm text-muted-foreground">Monitor all connected systems</p>
            </div>
            <div className="rounded-md bg-background p-4 h-32 flex items-center justify-center">
              <p className="text-center text-muted-foreground">System status visualization</p>
            </div>
          </div>
          
          <div className="rounded-xl border bg-card text-card-foreground shadow p-4 transition-all hover:shadow-md">
            <div className="flex flex-col space-y-1.5 pb-4">
              <h3 className="text-lg font-semibold leading-none tracking-tight">Performance Metrics</h3>
              <p className="text-sm text-muted-foreground">Real-time performance data</p>
            </div>
            <div className="rounded-md bg-background p-4 h-32 flex items-center justify-center">
              <p className="text-center text-muted-foreground">Performance charts</p>
            </div>
          </div>
          
          <div className="rounded-xl border bg-card text-card-foreground shadow p-4 transition-all hover:shadow-md">
            <div className="flex flex-col space-y-1.5 pb-4">
              <h3 className="text-lg font-semibold leading-none tracking-tight">Security Status</h3>
              <p className="text-sm text-muted-foreground">Security alerts and logs</p>
            </div>
            <div className="rounded-md bg-background p-4 h-32 flex items-center justify-center">
              <p className="text-center text-muted-foreground">Security dashboard</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-4">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{i}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">System Action {i}</p>
                      <p className="text-xs text-muted-foreground">Completed at {new Date().toLocaleTimeString()}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 60)} min ago
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default MCP;
