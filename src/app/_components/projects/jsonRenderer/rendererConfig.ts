import type { JSONRendererTheme } from '@mynameisankit/react-json-renderer';

export const rendererData = {
  name: 'Ankit Kumar',
  work: { company: 'Rubrik', focus: 'Frontend' },
  projects: ['React JSON Renderer', "Conway's Game of Life"],
};

export const rendererTheme: JSONRendererTheme = {
  background: 'var(--card)',
  color: 'var(--foreground)',
  keyColor: 'var(--foreground)',
  stringColor: 'var(--primary)',
  numberColor: 'var(--primary)',
  booleanColor: 'var(--primary)',
  nullColor: 'var(--muted-foreground)',
  lineNumberBackground: 'var(--secondary)',
  lineNumberColor: 'var(--muted-foreground)',
  indentGuideColor: 'var(--border)',
  toggleBackground: 'var(--card)',
  toggleColor: 'var(--primary)',
  toggleBorderColor: 'var(--border)',
};
