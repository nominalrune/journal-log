import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LoginSchema from '../schema/LoginSchema';
import Input from '../../common/components/ui/forms/Input';
import Button from '../../common/components/ui/Button';

const Login = () => {
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(LoginSchema)
	});

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Email"
				{...register('email')}
				error={errors.email?.message}
			/>
			<Input
				label="Password"
				type="password"
				{...register('password')}
				error={errors.password?.message}
			/>
			<Button type="submit">Login</Button>
		</form>
	);
};

export default Login;