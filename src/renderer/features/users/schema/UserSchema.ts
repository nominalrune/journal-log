import { z } from 'zod';
import { ProjectSchema } from '../../projects/schema/ProjectSchema';
import { TaskSchema } from '../../tasks/schema/TaskSchema';
import { LogSchema } from '../../logs/schema/LogSchema';

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  name: z.string().optional(),
  projects: z.array(ProjectSchema).optional(),
  tasks: z.array(TaskSchema).optional(),
  logs: z.array(LogSchema).optional(),
});

export type UserType = z.infer<typeof UserSchema>;
