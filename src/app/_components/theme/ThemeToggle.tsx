'use client';
import { useCopy } from '@/app/_components/localization/useCopy';
import { Button } from '@/app/_components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/_components/ui/Tooltip';
import { useTheme } from './useTheme';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { isLight, toggleTheme } = useTheme();
  const copy = useCopy();
  const label = copy(isLight ? 'Switch to dark theme' : 'Switch to light theme');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="theme-toggle grid place-items-center w-10 h-10 border border-border rounded-full bg-transparent text-foreground"
            aria-label={label}
            onClick={toggleTheme}
          >
            {isLight && <Moon size={18} />}
            {!isLight && <Sun size={18} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
