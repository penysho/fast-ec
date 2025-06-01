interface FormFieldProps {
	label: string;
	error?: string;
	required?: boolean;
	children: React.ReactNode;
	description?: string;
	htmlFor?: string;
}

export function FormField({
	label,
	error,
	required,
	children,
	description,
	htmlFor,
}: FormFieldProps) {
	return (
		<div>
			<label
				htmlFor={htmlFor}
				className="block font-medium text-gray-700 text-sm"
			>
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			{children}
			{description && (
				<p className="mt-1 text-gray-500 text-xs">{description}</p>
			)}
			{error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
		</div>
	);
}
