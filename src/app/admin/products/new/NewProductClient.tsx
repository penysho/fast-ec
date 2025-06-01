"use client";

import { ProductFormLayout } from "@/components/product/ProductFormLayout";
import { useProductForm } from "@/hooks/useProductForm";

/**
 * New product client component
 *
 * Handles client-side functionality for the new product creation page including:
 * - Form state management
 * - File upload handling
 * - Product submission
 *
 * @returns New product creation interface with interactive features
 */
export function NewProductClient() {
	const {
		form,
		isLoading,
		dragActive,
		watchedImages,
		onSubmit,
		handleDrag,
		handleDrop,
		handleFileSelect,
		removeImage,
		handleCancel,
		toast,
	} = useProductForm();

	return (
		<ProductFormLayout
			title="新商品追加"
			subtitle="新しい商品を登録します"
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
			submitButtonText="商品を保存"
			loadingButtonText="保存中..."
		/>
	);
}
