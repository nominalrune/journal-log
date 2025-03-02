import { z } from 'zod';
import { ProjectSchema } from '../../projects/schema/ProjectSchema';
import { UserSchema } from '../../users/schema/UserSchema';
import { LogSchema } from '../../logs/schema/LogSchema';

export const TaskSchema = z.object({
  id: z.coerce.number().int(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE', 'PENDING']),
  title: z.string().min(3, { message: "Title should be at least 3 letters" }),
  description: z.string().optional().nullable(),
  projectId: z.coerce.number().int(),
  parentId: z.coerce.number().int().optional().nullable(),
  assignedToId: z.coerce.number().int().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().optional().nullable(),
});
export const TaskSchemaWithRelations = TaskSchema.extend({
  // project: ProjectSchema.optional(),
  // parent: TaskSchema.optional(),
  // children: z.array(TaskSchema).optional(),
  // logs: z.array(LogSchema).optional(),
  // assignedTo: UserSchema.optional(),
});

export type TaskType = z.infer<typeof TaskSchema>;
export type TaskTypeWithRelations = z.infer<typeof TaskSchemaWithRelations>;
