import { twMerge } from 'tailwind-merge';

export type TextareaProps = { type: "textarea"; } & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export const Textarea = ({ type, className, ...props  }: TextareaProps) => {
	return <textarea className={twMerge("bg-slate-50 rounded-sm border-none", className)} {...props} />;
}

