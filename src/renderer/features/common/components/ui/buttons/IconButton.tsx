import { twMerge } from 'tailwind-merge';

export default function IconButton({ className, size, ...props }: { size?: "sm" | "md" | "lg" | number; } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const sizeClass = typeof size === "number" ? `size-${size}` : size === "sm" ? "size-6" : size === "md" ? "size-8" : size === "lg" ? "size-10" : "size-8";
	return <button className={twMerge("rounded-md hover:shadow", sizeClass, className)} {...props} />;
}