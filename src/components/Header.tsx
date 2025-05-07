
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Menu, Star, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { UpgradeButton } from './UpgradeButton';
import { useSettings } from '@/context/SettingsContext';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Logo } from './Logo';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { getActiveProvider, aiProviders } = useSettings();
  const activeProvider = getActiveProvider();
  const [scrolled, setScrolled] = useState(false);
  
  // Map of provider IDs to more descriptive model names
  const modelNameMap: Record<string, string> = {
    'llama': 'Llama 70 B',
    'openai': 'GPT-4 Turbo',
    'groq': 'Groq LLM',
    'deepseek': 'DeepSeek Coder'
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`border-b border-border/40 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/70 ${scrolled ? 'shadow-soft' : ''} transition-all duration-300 sticky top-0 z-20`}>
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden hover:bg-accent/60">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          
          <div className="hidden md:flex md:items-center md:gap-2 hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Back to Projects</span>
          </div>
          
          <div className="md:hidden ml-2">
            <Logo size="sm" />
          </div>
        </div>
        
        <div className="flex items-center gap-2.5">
          {activeProvider && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 backdrop-blur-md px-3 py-1 text-xs shadow-sm hover:border-primary/30 transition-all duration-300">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="font-medium">
                    {modelNameMap[activeProvider.id] || activeProvider.name}
                  </span>
                  <Star className="h-3 w-3 text-amber-400 ml-0.5" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-background/95 backdrop-blur-md border-border/60">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Active AI Model</p>
                  <p className="text-xs text-muted-foreground">Premium performance tier</p>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
          
          <ThemeToggle />
          
          <div className="hidden sm:block">
            <UpgradeButton />
          </div>
          
          <div className="sm:hidden">
            <Button 
              size="icon" 
              className="h-9 w-9 rounded-full bg-gradient-to-br from-premium to-premium-muted/80 text-white shadow-md"
            >
              <Crown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
