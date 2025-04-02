
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UpgradeButtonProps {
  className?: string;
}

export function UpgradeButton({ className }: UpgradeButtonProps) {
  return (
    <Button 
      className={`premium-button rounded-full ${className}`}
      onClick={() => console.log('Upgrade clicked')}
    >
      <Sparkles className="w-4 h-4 mr-2" />
      Upgrade to Pro
    </Button>
  );
}
