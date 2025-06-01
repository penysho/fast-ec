import { FormField } from "@/components/ui/FormField";
import type { ProductFormData } from "@/types/product";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface ProductStatusSectionProps {
	register: UseFormRegister<ProductFormData>;
	errors: FieldErrors<ProductFormData>;
}

const statuses = [
	{ value: "draft" as const, label: "下書き" },
	{ value: "published" as const, label: "公開" },
];

/**
 * Product status section component
 *
 * Renders the product publishing status form fields including:
 * - Status selection (draft/published)
 *
 * @param register - React Hook Form register function
 * @param errors - Form validation errors
 * @returns Status form section
 */
export function ProductStatusSection({
	register,
	errors,
}: ProductStatusSectionProps) {
	return (
		<div className="rounded-lg bg-white p-6 shadow">
			<h3 className="mb-4 font-medium text-gray-900 text-lg">公開設定</h3>
			<FormField label="ステータス" error={errors.status?.message}>
				<div className="mt-2 space-y-2">
					{statuses.map((status) => (
						<label key={status.value} className="flex items-center">
							<input
								{...register("status")}
								type="radio"
								value={status.value}
								className="text-indigo-600 focus:ring-indigo-500"
							/>
							<span className="ml-2 text-gray-700 text-sm">{status.label}</span>
						</label>
					))}
				</div>
			</FormField>
		</div>
	);
}
