export type SelectProps = React.InputHTMLAttributes<HTMLInputElement> & {
	type:"select",
	options: [string, string][];
}

export const Select = ({options, ...rest}:SelectProps) => {
	return <select>
		{options.map(([label, value]) => <option key={value} value={value}>{label}</option>)}
	</select>;
}

