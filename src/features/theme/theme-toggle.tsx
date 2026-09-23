'use client';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { useTheme } from './use-theme';

export function ThemeToggle() {
  const { light, toggleTheme } = useTheme();
  const label = light ? 'Switch to dark theme' : 'Switch to light theme';
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="theme-toggle"
            aria-label={label}
            onClick={toggleTheme}
          >
            {light ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
