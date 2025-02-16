import { z } from 'zod';
import { UserSchema } from './UserSchema';

export const NewUserSchema = UserSchema.omit({ id: true });

export type NewUserType = z.infer<typeof NewUserSchema>;
