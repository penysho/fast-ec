import { FormField } from "@/components/ui/FormField";
import { ProductCategories } from "@/types/product";
import type { ProductFormData } from "@/types/product";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface ProductBasicInfoSectionProps {
	register: UseFormRegister<ProductFormData>;
	errors: FieldErrors<ProductFormData>;
}

/**
 * Product basic information section component
 *
 * Renders the basic product information form fields including:
 * - Product name
 * - Product description
 * - Category selection
 *
 * @param register - React Hook Form register function
 * @param errors - Form validation errors
 * @returns Basic information form section
 */
export function ProductBasicInfoSection({
	register,
	errors,
}: ProductBasicInfoSectionProps) {
	return (
		<div className="rounded-lg bg-white p-6 shadow">
			<h3 className="mb-4 font-medium text-gray-900 text-lg">基本情報</h3>
			<div className="space-y-4">
				{/* 商品名 */}
				<FormField
					label="商品名"
					error={errors.name?.message}
					required
					htmlFor="name"
				>
					<input
						{...register("name")}
						id="name"
						type="text"
						className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring-indigo-500 sm:text-sm ${
							errors.name
								? "border-red-300 focus:border-red-500"
								: "border-gray-300 focus:border-indigo-500"
						}`}
						placeholder="商品名を入力してください"
					/>
				</FormField>

				{/* 商品説明 */}
				<FormField
					label="商品説明"
					error={errors.description?.message}
					required
					htmlFor="description"
				>
					<textarea
						{...register("description")}
						id="description"
						rows={4}
						className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring-indigo-500 sm:text-sm ${
							errors.description
								? "border-red-300 focus:border-red-500"
								: "border-gray-300 focus:border-indigo-500"
						}`}
						placeholder="商品の説明を入力してください"
					/>
				</FormField>

				{/* カテゴリー */}
				<FormField
					label="カテゴリー"
					error={errors.category?.message}
					htmlFor="category"
				>
					<select
						{...register("category")}
						id="category"
						className="mt-1 block w-full rounded-md border border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					>
						{ProductCategories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</FormField>
			</div>
		</div>
	);
}
