import { z } from 'zod';
import { ProjectSchema } from './ProjectSchema';
import { NewTaskSchema } from '@/features/tasks/schema/NewTaskSchema';
import { EditTaskSchema } from '@/features/tasks/schema/EditTaskSchema';

export const NewProjectSchema = ProjectSchema
	.omit({ id: true, createdAt: true, updatedAt: true })
	.extend({
		tasks: z.object({
			create: z.array(NewTaskSchema).optional(),
			update: z.array(z.object({
				where: z.object({ id: z.number() }),
				data: EditTaskSchema,
			})).optional(),
		}).optional(),
	});

export type NewProjectType = z.infer<typeof NewProjectSchema>;
