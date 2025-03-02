import {twMerge} from "tailwind-merge";

const Button = ({className, ...props}:React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return <button className={twMerge("bg-sky-600 text-white p-2 px-4 hover:shadow",className)} {...props}/>;
}

export default Button;
