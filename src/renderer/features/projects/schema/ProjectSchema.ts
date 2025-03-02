import { z } from 'zod';
import { UserSchema } from '../../users/schema/UserSchema';
import { TaskSchema } from '../../tasks/schema/TaskSchema';

export const ProjectSchema = z.object({
	id: z.coerce.number().int(),
	title: z.string().min(3, { message: "Name should be at least 3 letters" }),
	description: z.string().optional().nullable(),
	status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']),
	ownerId: z.coerce.number().int().min(1, { message: "Owner ID should be at least 1" }),
	createdAt: z.date(),
	updatedAt: z.date().optional(),
});
export const ProjectSchemaWithRelations = ProjectSchema.extend({
	owner: UserSchema.optional(),
	tasks: z.array(TaskSchema).optional(),
});

export type ProjectType = z.infer<typeof ProjectSchema>;
export type ProjectTypeWithRelations = z.infer<typeof ProjectSchemaWithRelations>;