export type TextareaProps = { type: "textarea"; } & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export const Textarea = ({ type, ...props  }: TextareaProps) => {
	return <textarea {...props} />;
}

