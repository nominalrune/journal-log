import { memo } from "react";
import { useForm as _useForm, FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodAny, ZodBigInt, ZodBoolean, ZodDate, ZodEnum, ZodNull, ZodNullable, ZodNumber, ZodObject, ZodOptional, ZodString } from 'zod';
import Input from '../components/ui/forms/Input';
import Button from '../components/ui/buttons/Button';
import { twMerge } from 'tailwind-merge';
type ZodType = ZodString | ZodBigInt | ZodNumber | ZodBoolean | ZodDate | ZodAny | ZodOptional<ZodType> | ZodNullable<ZodType> | ZodNull | ZodEnum<[string, ...string[]]> | Schema;
type Schema = ZodObject<{ [key: string]: ZodType; }>;
const getInputType = (schema: ZodType) => {
	if (schema instanceof ZodBigInt || schema instanceof ZodNumber) return 'number';
	if (schema instanceof ZodBoolean) return 'checkbox';
	if (schema instanceof ZodDate) return 'date';
	return 'text';
};
const useForm = <S extends Schema>(
	schema: S,
	onSubmit: (data: z.infer<S>) => unknown,
	initialState?: Partial<z.infer<S>>
) => {
	const Form = ({ render, className }: { render?: (methods: UseFormReturn<FieldValues, any, undefined>) => React.ReactNode; className?: string; }) => {
		console.log({initialState})
		const methods = _useForm({
			resolver: zodResolver(schema),
			defaultValues: async () => initialState,
		});
		const dict = schema.shape;
		return <FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} className={twMerge("flex flex-col gap-2", className)}>
				{
					render
						? render(methods)
						: <>
							{
								Object.entries(dict).map(([key, value]) => {
									return <Input
										key={key}
										label={value.description ?? key}
										{...methods.register(key)}
										type={getInputType(value)}
										error={methods.formState.errors[key as keyof z.infer<S>]?.message?.toString()}
									/>;
								})
							}
							<Button className="self-end" type="submit">Submit</Button>
						</>
				}
			</form>
		</FormProvider>;
	};
	return { Form };
};

export default useForm;
