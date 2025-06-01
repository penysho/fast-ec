import { ImagePreview } from "@/components/ui/ImagePreview";
import type { ProductFormData } from "@/types/product";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

interface ProductImageSectionProps {
	control: Control<ProductFormData>;
	dragActive: boolean;
	watchedImages: File[];
	handleDrag: (e: React.DragEvent) => void;
	handleDrop: (e: React.DragEvent) => void;
	handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
	removeImage: (index: number) => void;
}

/**
 * Product image upload section component
 *
 * Renders the image upload form section including:
 * - Drag & drop area
 * - File selection
 * - Image preview with removal functionality
 *
 * @param control - React Hook Form control object
 * @param dragActive - Whether drag operation is active
 * @param watchedImages - Currently selected image files
 * @param handleDrag - Drag event handler
 * @param handleDrop - Drop event handler
 * @param handleFileSelect - File selection handler
 * @param removeImage - Image removal handler
 * @returns Image upload form section
 */
export function ProductImageSection({
	control,
	dragActive,
	watchedImages,
	handleDrag,
	handleDrop,
	handleFileSelect,
	removeImage,
}: ProductImageSectionProps) {
	return (
		<div className="rounded-lg bg-white p-6 shadow">
			<h3 className="mb-4 font-medium text-gray-900 text-lg">商品画像</h3>

			{/* ドラッグ&ドロップエリア */}
			<Controller
				name="images"
				control={control}
				render={({ field: _field }) => (
					<div
						className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
							dragActive
								? "border-indigo-500 bg-indigo-50"
								: "border-gray-300 hover:border-gray-400"
						}`}
						onDragEnter={handleDrag}
						onDragLeave={handleDrag}
						onDragOver={handleDrag}
						onDrop={handleDrop}
					>
						<svg
							className="mx-auto h-12 w-12 text-gray-400"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 48 48"
						>
							<title>画像アップロードアイコン</title>
							<path
								d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<div className="mt-4">
							<label htmlFor="file-upload" className="cursor-pointer">
								<span className="mt-2 block font-medium text-indigo-600 text-sm hover:text-indigo-500">
									ファイルを選択
								</span>
								<span className="mt-1 block text-gray-500 text-sm">
									または画像をドラッグ&ドロップ
								</span>
								<input
									id="file-upload"
									name="file-upload"
									type="file"
									className="sr-only"
									multiple
									accept="image/*"
									onChange={handleFileSelect}
								/>
							</label>
						</div>
						<p className="mt-1 text-gray-500 text-xs">
							PNG, JPG, GIF（最大 10MB）
						</p>
					</div>
				)}
			/>

			{/* 選択された画像のプレビュー */}
			<ImagePreview files={watchedImages} onRemove={removeImage} />
		</div>
	);
}
