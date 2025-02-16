import { UserSchema } from './UserSchema';
import { z } from 'zod';

export const EditUserSchema = UserSchema.partial().required({ id: true });

export type EditUserType = z.infer<typeof EditUserSchema>;
