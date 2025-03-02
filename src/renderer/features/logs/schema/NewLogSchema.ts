import { z } from 'zod';
import { LogSchema } from './LogSchema';

export const NewLogSchema = LogSchema
  .omit({ id: true, createdAt: true, updatedAt: true });

export type NewLogType = z.infer<typeof NewLogSchema>;
