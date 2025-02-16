import { ProjectSchema } from './ProjectSchema';
import {z} from 'zod';

export const EditProjectSchema = ProjectSchema.partial().required({ id: true });

export type EditProjectType = z.infer<typeof EditProjectSchema>;
