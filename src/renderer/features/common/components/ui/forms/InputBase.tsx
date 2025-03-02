import { twMerge } from 'tailwind-merge';
type InputProps = {
	label?: string;
	error?: string;
	className?: string;
	labelClassName?: string;
	errorClassName?: string;
	outerClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputBase = ({
	label,
	error,
	className,
	labelClassName,
	errorClassName,
	outerClassName,
	id,
	...rest
}: InputProps) => {
	return <div className={twMerge("flex flex-col", outerClassName)}>
		<label htmlFor={id} className={twMerge("text-md text-slate-700", labelClassName)}>
			{label}
		</label>
		<input id={id} className={twMerge("bg-slate-50 rounded-sm border-none",className)} {...rest} />
		<div className={twMerge("text-sm text-red-600 ", errorClassName)}>{error}</div>
	</div>;
};

export default InputBase;
