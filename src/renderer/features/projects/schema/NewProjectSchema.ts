import { z } from 'zod';
import { ProjectSchema } from './ProjectSchema';

export const NewProjectSchema = ProjectSchema.omit({ id: true });

export type NewProjectType = z.infer<typeof NewProjectSchema>;
