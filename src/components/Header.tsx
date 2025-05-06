
import React, { useState } from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { UpgradeButton } from './UpgradeButton';
import { useSettings } from '@/context/SettingsContext';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { getActiveProvider, aiProviders } = useSettings();
  const activeProvider = getActiveProvider();
  
  // Map of provider IDs to more descriptive model names
  const modelNameMap: Record<string, string> = {
    'llama': 'Llama 3 70B',
    'openai': 'GPT-4 Turbo',
    'groq': 'Groq LLM',
    'deepseek': 'DeepSeek Coder'
  };

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="hidden md:flex md:items-center md:gap-2">
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Back to Projects</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {activeProvider && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 rounded-full border border-border/40 bg-background px-3 py-1 text-xs">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>
                    {modelNameMap[activeProvider.id] || activeProvider.name}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Active AI Model</p>
              </TooltipContent>
            </Tooltip>
          )}
          <ThemeToggle />
          <UpgradeButton />
        </div>
      </div>
    </header>
  );
}
