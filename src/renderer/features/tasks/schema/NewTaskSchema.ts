import { z } from 'zod';
import { TaskSchema } from './TaskSchema';
import { ProjectSchema } from '@/features/projects/schema/ProjectSchema';

export const NewTaskSchema = TaskSchema
	.omit({ id: true, createdAt: true, updatedAt: true });

export type NewTaskType = z.infer<typeof NewTaskSchema>;
