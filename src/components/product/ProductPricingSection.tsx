import { FormField } from "@/components/ui/FormField";
import type { ProductFormData } from "@/types/product";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface ProductPricingSectionProps {
	register: UseFormRegister<ProductFormData>;
	errors: FieldErrors<ProductFormData>;
}

/**
 * Product pricing and inventory section component
 *
 * Renders the pricing and inventory form fields including:
 * - Product price
 * - Stock quantity
 *
 * @param register - React Hook Form register function
 * @param errors - Form validation errors
 * @returns Pricing and inventory form section
 */
export function ProductPricingSection({
	register,
	errors,
}: ProductPricingSectionProps) {
	return (
		<div className="rounded-lg bg-white p-6 shadow">
			<h3 className="mb-4 font-medium text-gray-900 text-lg">価格・在庫</h3>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{/* 価格 */}
				<FormField
					label="価格"
					error={errors.price?.message}
					required
					htmlFor="price"
				>
					<div className="relative mt-1">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<span className="text-gray-500 sm:text-sm">¥</span>
						</div>
						<input
							{...register("price")}
							id="price"
							type="number"
							className={`block w-full rounded-md border py-2 pr-3 pl-7 shadow-sm focus:ring-indigo-500 sm:text-sm ${
								errors.price
									? "border-red-300 focus:border-red-500"
									: "border-gray-300 focus:border-indigo-500"
							}`}
							placeholder="0"
							min="0"
						/>
					</div>
				</FormField>

				{/* 在庫数 */}
				<FormField
					label="在庫数"
					error={errors.stock?.message}
					required
					htmlFor="stock"
				>
					<input
						{...register("stock")}
						id="stock"
						type="number"
						className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring-indigo-500 sm:text-sm ${
							errors.stock
								? "border-red-300 focus:border-red-500"
								: "border-gray-300 focus:border-indigo-500"
						}`}
						placeholder="0"
						min="0"
					/>
				</FormField>
			</div>
		</div>
	);
}
