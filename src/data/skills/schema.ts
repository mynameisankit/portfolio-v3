import { resolveSkill } from './skillDefinitions';
import { z } from 'zod';

const skillSchema = z.object({
  name: z.string().min(1),
  url: z
    .string()
    .url()
    .refine((url) => url.startsWith('https://'), 'Use an HTTPS reference URL'),
  icon: z.string().optional().default('code'),
});

export const skillCategorySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  items: z.array(z.union([skillSchema, z.string().min(1).transform(resolveSkill)])).min(1),
});
