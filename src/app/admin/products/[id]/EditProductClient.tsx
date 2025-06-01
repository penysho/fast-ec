"use client";

import { ProductFormLayout } from "@/components/product/ProductFormLayout";
import { useProductEditForm } from "@/hooks/useProductEditForm";

interface EditProductClientProps {
	productId: string;
}

/**
 * Edit product client component
 *
 * Handles client-side functionality for the product editing page including:
 * - Form state management with existing data
 * - File upload handling
 * - Product update submission
 *
 * @param productId - ID of the product to edit
 * @returns Product editing interface with interactive features
 */
export function EditProductClient({ productId }: EditProductClientProps) {
	const {
		form,
		product,
		isLoading,
		isLoadingProduct,
		dragActive,
		watchedImages,
		onSubmit,
		handleDrag,
		handleDrop,
		handleFileSelect,
		removeImage,
		handleCancel,
		toast,
	} = useProductEditForm(productId);

	// データ読み込み中の表示
	if (isLoadingProduct) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<svg
						className="mx-auto h-12 w-12 animate-spin text-indigo-600"
						fill="none"
						viewBox="0 0 24 24"
					>
						<title>読み込み中アイコン</title>
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
					<p className="mt-2 text-gray-600 text-sm">
						商品データを読み込み中...
					</p>
				</div>
			</div>
		);
	}

	// 商品が見つからない場合
	if (!product && !isLoadingProduct) {
		return (
			<div className="py-12 text-center">
				<svg
					className="mx-auto h-12 w-12 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<title>商品未発見アイコン</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0118 12a8 8 0 01-16 0 8 8 0 0116 0z"
					/>
				</svg>
				<h3 className="mt-2 font-medium text-gray-900 text-sm">
					商品が見つかりません
				</h3>
				<p className="mt-1 text-gray-500 text-sm">
					指定された商品が存在しないか、削除されている可能性があります。
				</p>
			</div>
		);
	}

	return (
		<ProductFormLayout
			title="商品編集"
			subtitle={`商品「${product?.name}」を編集します`}
			form={form}
			isLoading={isLoading}
			dragActive={dragActive}
			watchedImages={watchedImages}
			onSubmit={onSubmit}
			handleDrag={handleDrag}
			handleDrop={handleDrop}
			handleFileSelect={handleFileSelect}
			removeImage={removeImage}
			handleCancel={handleCancel}
			toast={toast}
			submitButtonText="変更を保存"
			loadingButtonText="更新中..."
		/>
	);
}
