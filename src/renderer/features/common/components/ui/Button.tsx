import {twMerge} from "tailwind-merge";

const Button = ({className, ...props}:React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return <button className={twMerge("rounded hover:shadow",className)} {...props}/>;
}

export default Button;
