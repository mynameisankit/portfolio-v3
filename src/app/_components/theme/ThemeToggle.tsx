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
import { Moon, Sun, TreePalm } from 'lucide-react';

const options = {
  dark: { label: 'Switch to light theme', Icon: Sun },
  light: { label: 'Switch to GTA VI theme', Icon: TreePalm },
  vice: { label: 'Switch to dark theme', Icon: Moon },
};

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const copy = useCopy();
  const { label: action, Icon } = options[theme];
  const label = copy(action);

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
            <Icon size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
