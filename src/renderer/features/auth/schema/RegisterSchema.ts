import { z } from 'zod';

const RegisterSchema = z.object({
	name: z.string()
		.min(3, { message: "Name must be at least 3 characters long" })
		.max(50, { message: "Name must be less than 50 characters long" }),
	email: z.string()
		.email({ message: "Invalid email address" }),
	password: z.string()
		.min(6, { message: "Password must be at least 6 characters long" })
		.max(50, { message: "Password must be less than 50 characters long" })
});

export default RegisterSchema;