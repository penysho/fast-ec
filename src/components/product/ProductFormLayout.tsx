import { ToastContainer } from "@/components/ui/Toast";
import type { Toast } from "@/hooks/useToast";
import type { ProductFormData } from "@/types/product";
import type { UseFormReturn } from "react-hook-form";
import { ProductBasicInfoSection } from "./ProductBasicInfoSection";
import { ProductImageSection } from "./ProductImageSection";
import { ProductPricingSection } from "./ProductPricingSection";
import { ProductSeoSection } from "./ProductSeoSection";
import { ProductStatusSection } from "./ProductStatusSection";

interface ProductFormLayoutProps {
	title: string;
	subtitle: string;
	form: UseFormReturn<ProductFormData>;
	isLoading: boolean;
	dragActive: boolean;
	watchedImages: File[];
	onSubmit: (data: ProductFormData) => void;
	handleDrag: (e: React.DragEvent) => void;
	handleDrop: (e: React.DragEvent) => void;
	handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
	removeImage: (index: number) => void;
	handleCancel: () => void;
	toast: {
		toasts: Toast[];
		removeToast: (id: string) => void;
	};
	submitButtonText: string;
	loadingButtonText: string;
}

/**
 * Product form layout component
 *
 * Provides a consistent layout for product forms (create/edit) with:
 * - Header with title and action buttons
 * - Form sections organized in a responsive grid
 * - Toast notifications
 *
 * @param props - Form layout configuration and handlers
 * @returns Consistent product form layout
 */
export function ProductFormLayout({
	title,
	subtitle,
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
	submitButtonText,
	loadingButtonText,
}: ProductFormLayoutProps) {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isValid },
	} = form;

	return (
		<div className="space-y-6">
			{/* 通知システム */}
			<ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

			{/* ページヘッダー */}
			<div className="border-gray-200 border-b pb-4">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="font-bold text-2xl text-gray-900">{title}</h1>
						<p className="mt-1 text-gray-600 text-sm">{subtitle}</p>
					</div>
					<div className="flex space-x-3">
						<button
							type="button"
							onClick={handleCancel}
							className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							キャンセル
						</button>
						<button
							type="button"
							onClick={handleSubmit(onSubmit)}
							disabled={isLoading || !isValid}
							className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 font-semibold text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{isLoading ? (
								<>
									<svg
										className="mr-2 h-4 w-4 animate-spin"
										fill="none"
										viewBox="0 0 24 24"
									>
										<title>処理中アイコン</title>
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
									{loadingButtonText}
								</>
							) : (
								submitButtonText
							)}
						</button>
					</div>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{/* メインコンテンツ */}
					<div className="space-y-6 lg:col-span-2">
						{/* 基本情報 */}
						<ProductBasicInfoSection register={register} errors={errors} />

						{/* 価格・在庫 */}
						<ProductPricingSection register={register} errors={errors} />

						{/* 商品画像 */}
						<ProductImageSection
							control={control}
							dragActive={dragActive}
							watchedImages={watchedImages}
							handleDrag={handleDrag}
							handleDrop={handleDrop}
							handleFileSelect={handleFileSelect}
							removeImage={removeImage}
						/>
					</div>

					{/* サイドバー */}
					<div className="space-y-6">
						{/* 公開設定 */}
						<ProductStatusSection register={register} errors={errors} />

						{/* タグとSEO設定 */}
						<ProductSeoSection register={register} errors={errors} />
					</div>
				</div>
			</form>
		</div>
	);
}
