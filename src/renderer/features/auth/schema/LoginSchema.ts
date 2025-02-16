import { z } from 'zod';

const LoginSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string(),
});

export default LoginSchema;
