import { z } from 'zod';
import { TaskSchema } from '../../tasks/schema/TaskSchema';
import { UserSchema } from '../../users/schema/UserSchema';

export const LogSchema = z.object({
  id: z.number().int(),
  taskId: z.number().int(),
  task: TaskSchema.optional(),
  userId: z.number().int(),
  user: UserSchema.optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type LogType = z.infer<typeof LogSchema>;
