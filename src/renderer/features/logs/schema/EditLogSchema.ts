import { LogSchema } from './LogSchema';
import { z } from 'zod';

export const EditLogSchema = LogSchema
	.partial().required({ id: true });

export type EditLogType = z.infer<typeof EditLogSchema>;
