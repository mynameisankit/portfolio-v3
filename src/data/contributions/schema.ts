import { z } from 'zod';

export const contributionSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(['issue', 'pullRequest']),
  repository: z.string().min(1),
  number: z.number().int().positive(),
  title: z.string().min(1),
  summary: z.string().min(1),
  url: z.string().url().startsWith('https://github.com/'),
});

export type Contribution = z.infer<typeof contributionSchema>;
