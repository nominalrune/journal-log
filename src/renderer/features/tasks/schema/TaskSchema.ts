import { z } from 'zod';
import { ProjectSchema } from '../../projects/schema/ProjectSchema';
import { UserSchema } from '../../users/schema/UserSchema';
import { LogSchema } from '../../logs/schema/LogSchema';

export const TaskSchema = z.object({
  id: z.number().int(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE', 'PENDING']),
  title: z.string().min(3, { message: "Title should be at least 3 letters" }),
  description: z.string().optional(),
  projectId: z.number().int(),
  project: ProjectSchema.optional(),
  parentId: z.number().int().optional(),
  parent: z.lazy(() => TaskSchema).optional(),
  children: z.array(z.lazy(() => TaskSchema)).optional(),
  logs: z.array(LogSchema).optional(),
  assignedToId: z.number().int().optional(),
  assignedTo: UserSchema.optional(),
});

export type TaskType = z.infer<typeof TaskSchema>;
