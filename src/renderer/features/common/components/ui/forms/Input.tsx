import { twMerge } from 'tailwind-merge';
import { Select, SelectProps } from './Select';
import { Textarea, TextareaProps } from './Textarea';
type InputBaseProps = {
	label?: string;
	error?: string;
	className?: string;
	labelClassName?: string;
	errorClassName?: string;
	outerClassName?: string;
};
type InputProps = TextareaProps | SelectProps | React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
	label,
	error,
	className,
	labelClassName,
	errorClassName,
	outerClassName,
	...rest
}: InputProps & InputBaseProps) {
	if (["radio", "checkbox"].includes(rest.type ?? "")) {
		return <label className={twMerge("text-md text-slate-700", labelClassName)}>
			<input className={twMerge(className)} {...rest} />
			{label}
		</label>;
	}
	return <div className={twMerge("flex flex-col gap-2", outerClassName)}>
		<label htmlFor={rest.id} className={twMerge("flex gap-2 text-md text-slate-700", labelClassName)}>
			{label}
		</label>
		<InputBase {...rest} className={className} />
		<div className={twMerge("text-sm text-red-600 ", errorClassName)}>{error}</div>
	</div>;
};
function InputBase<T extends InputProps>(props: T) {
	if (isTextareaProps(props)) {
		return <Textarea {...props} />;
	}
	if (isSelectProps(props)) {
		return <Select {...props} />;
	}
	return <input {...props} className={twMerge("bg-slate-50 rounded-sm border-none", props.className)} />;
};
function isTextareaProps(props: any): props is TextareaProps {
	return props.type === 'textarea';
}
function isSelectProps(props: any): props is SelectProps {
	return props.type === 'select';
}

export default Input;
