import { z } from 'zod';
import {UserSchema} from '../../users/schema/UserSchema';

export const ProjectSchema = z.object({
	id: z.number().int(),
	title: z.string().min(3, { message: "Name should be at least 3 letters" }),
	description: z.string().optional(),
	ownerId: z.number().int(),
	owner: UserSchema.optional(),
	tasks: z.array(z.object({
		id: z.number().int(),
		title: z.string(),
		description: z.string().optional(),
		projectId: z.number().int(),
		createdAt: z.date(),
		updatedAt: z.date().optional(),
	})).optional(),
});

export type ProjectType = z.infer<typeof ProjectSchema>;