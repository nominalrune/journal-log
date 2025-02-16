import { TaskSchema } from './TaskSchema';
import { z } from 'zod';

export const EditTaskSchema = TaskSchema.partial().required({ id: true });

export type EditTaskType = z.infer<typeof EditTaskSchema>;
