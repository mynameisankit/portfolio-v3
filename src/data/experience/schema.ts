import { z } from 'zod';

export const careerEntrySchema = z.object({
  id: z.string().min(1),
  organization: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  location: z.string(),
  current: z.boolean(),
  summary: z.string(),
  highlights: z.array(z.string()),
});
