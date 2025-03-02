import { z } from 'zod';
import { TaskSchema } from '../../tasks/schema/TaskSchema';
import { UserSchema } from '../../users/schema/UserSchema';

export const LogSchema = z.object({
	id: z.coerce.number().int(),
	title: z.string()
		.min(3, { message: "Title should be at least 3 letters" }),
	description: z.string().optional().nullable(),
	date: z.date(),
	timeSpent: z.coerce.number().int()
		.min(0, { message: "Time spent should be at least 0 min" })
		.max(1440, { message: "Time spent should be at most 1440 min" }),
	taskId: z.coerce.number().int(),
	userId: z.coerce.number().int(),
	createdAt: z.date(),
	updatedAt: z.date().optional().nullable(),
});
export const LogSchemaWithRelations = LogSchema.extend({
	// task: TaskSchema.optional(),
	user: UserSchema.optional(),
});

export type LogType = z.infer<typeof LogSchema>;
export type LogTypeWithRelations = z.infer<typeof LogSchemaWithRelations>;
