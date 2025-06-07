import type { ButtonHTMLAttributes } from "react";
import { cn } from "~/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "ghost" | "outline";
	size?: "sm" | "md" | "lg";
	isLoading?: boolean;
	children: React.ReactNode;
}

/**
 * Reusable button component with multiple variants and sizes
 *
 * @param variant - Button style variant
 * @param size - Button size
 * @param isLoading - Show loading state
 * @param children - Button content
 * @param className - Additional CSS classes
 * @param props - Additional HTML button attributes
 * @returns Styled button component
 */
export function Button({
	variant = "primary",
	size = "md",
	isLoading = false,
	children,
	className,
	disabled,
	...props
}: ButtonProps) {
	const baseStyles =
		"inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

	const variants = {
		primary:
			"bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-900",
		secondary:
			"bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
		ghost: "text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-500",
		outline:
			"border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-500",
	};

	const sizes = {
		sm: "h-8 px-3 text-sm",
		md: "h-10 px-4 text-sm",
		lg: "h-12 px-6 text-base",
	};

	return (
		<button
			className={cn(baseStyles, variants[variant], sizes[size], className)}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading && (
				<svg
					className="mr-2 h-4 w-4 animate-spin"
					fill="none"
					viewBox="0 0 24 24"
				>
					<title>読み込み中</title>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			)}
			{children}
		</button>
	);
}
