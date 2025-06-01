import { FormField } from "@/components/ui/FormField";
import type { ProductFormData } from "@/types/product";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface ProductSeoSectionProps {
	register: UseFormRegister<ProductFormData>;
	errors: FieldErrors<ProductFormData>;
}

/**
 * Product SEO and tags section component
 *
 * Renders the product SEO and tagging form fields including:
 * - Product tags
 * - Meta title
 * - Meta description
 *
 * @param register - React Hook Form register function
 * @param errors - Form validation errors
 * @returns SEO and tags form section
 */
export function ProductSeoSection({
	register,
	errors,
}: ProductSeoSectionProps) {
	return (
		<>
			{/* タグ */}
			<div className="rounded-lg bg-white p-6 shadow">
				<h3 className="mb-4 font-medium text-gray-900 text-lg">タグ</h3>
				<FormField
					label="商品タグ"
					error={errors.tags?.message}
					description="例: 夏物, セール, 新作"
					htmlFor="tags"
				>
					<input
						{...register("tags")}
						id="tags"
						type="text"
						className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="カンマ区切りで入力"
					/>
				</FormField>
			</div>

			{/* SEO設定 */}
			<div className="rounded-lg bg-white p-6 shadow">
				<h3 className="mb-4 font-medium text-gray-900 text-lg">SEO設定</h3>
				<div className="space-y-4">
					<FormField
						label="メタタイトル"
						error={errors.metaTitle?.message}
						description="空白の場合は商品名が使用されます"
						htmlFor="metaTitle"
					>
						<input
							{...register("metaTitle")}
							id="metaTitle"
							type="text"
							className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="SEO用のタイトル"
						/>
					</FormField>

					<FormField
						label="メタディスクリプション"
						error={errors.metaDescription?.message}
						description="検索結果に表示される説明文（160文字以内推奨）"
						htmlFor="metaDescription"
					>
						<textarea
							{...register("metaDescription")}
							id="metaDescription"
							rows={3}
							className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="SEO用の説明文"
						/>
					</FormField>
				</div>
			</div>
		</>
	);
}
