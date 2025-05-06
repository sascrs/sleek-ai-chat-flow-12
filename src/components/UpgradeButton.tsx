
import React from 'react';
import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UpgradeButtonProps {
  className?: string;
}

export function UpgradeButton({ className }: UpgradeButtonProps) {
  return (
    <Button 
      className={`premium-button rounded-full shadow-premium transition-all btn-3d ${className}`}
      onClick={() => console.log('Upgrade clicked')}
    >
      <Crown className="w-4 h-4 mr-2" />
      <span className="font-space-grotesk tracking-tight">Upgrade to Pro</span>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-40 rounded-full">
        <div className="shimmer w-[30%] h-full absolute"></div>
      </div>
    </Button>
  );
}
