import { twMerge } from 'tailwind-merge';

export type SelectProps = React.InputHTMLAttributes<HTMLInputElement> & {
	type:"select",
	options: [string, string][];
}

export const Select = ({options, className, ...rest}:SelectProps) => {
	return <select className={twMerge("bg-slate-50 rounded-sm border-none", className)}>
		{options.map(([label, value]) => <option key={value} value={value}>{label}</option>)}
	</select>;
}

