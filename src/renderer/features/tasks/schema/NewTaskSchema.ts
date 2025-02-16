import { z } from 'zod';
import { TaskSchema } from './TaskSchema';

export const NewTaskSchema = TaskSchema.omit({ id: true });

export type NewTaskType = z.infer<typeof NewTaskSchema>;
