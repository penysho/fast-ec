import { useToast } from "@/hooks/useToast";
import {
	ProductCategories,
	type ProductFormData,
	productSchema,
} from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";

/**
 * Product form management hook
 *
 * Provides form state management, validation, and submission logic for product creation.
 * Includes image upload handling, drag & drop functionality, and proper error handling.
 *
 * @returns Object containing form methods, state, and event handlers
 */
export function useProductForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [dragActive, setDragActive] = useState(false);
	const router = useRouter();
	const toast = useToast();

	const createProduct = api.product.create.useMutation({
		onSuccess: () => {
			toast.success("商品を保存しました", "商品が正常に登録されました");
			setTimeout(() => {
				router.push("/admin/products");
			}, 1500);
		},
		onError: (error) => {
			console.error("保存エラー:", error);

			// 認証エラーの場合はログインページにリダイレクト
			if (error.data?.code === "UNAUTHORIZED") {
				toast.error("認証が必要です", "ログインしてから再度お試しください");
				setTimeout(() => {
					router.push("/admin/login");
				}, 1500);
				return;
			}

			toast.error("保存に失敗しました", "もう一度お試しください");
		},
		onSettled: () => {
			setIsLoading(false);
		},
	});

	const form = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: "",
			description: "",
			category: ProductCategories[0] || "衣類",
			price: "",
			stock: "",
			status: "draft",
			tags: "",
			metaTitle: "",
			metaDescription: "",
			images: [],
		},
		mode: "onChange",
	});

	const watchedImages = form.watch("images") || [];

	// フォーム送信処理
	const onSubmit = async (data: ProductFormData) => {
		setIsLoading(true);
		createProduct.mutate(data);
	};

	// ドラッグ&ドロップ処理
	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files?.[0]) {
			const newFiles = Array.from(e.dataTransfer.files).filter((file) => {
				if (!file.type.startsWith("image/")) {
					toast.warning("画像ファイルのみアップロード可能です");
					return false;
				}
				if (file.size > 10 * 1024 * 1024) {
					toast.warning(
						"ファイルサイズが大きすぎます",
						"10MB以下のファイルを選択してください",
					);
					return false;
				}
				return true;
			});

			if (newFiles.length > 0) {
				form.setValue("images", [...watchedImages, ...newFiles], {
					shouldValidate: true,
				});
				toast.success(`${newFiles.length}個の画像を追加しました`);
			}
		}
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files).filter((file) => {
				if (!file.type.startsWith("image/")) {
					toast.warning("画像ファイルのみアップロード可能です");
					return false;
				}
				if (file.size > 10 * 1024 * 1024) {
					toast.warning(
						"ファイルサイズが大きすぎます",
						"10MB以下のファイルを選択してください",
					);
					return false;
				}
				return true;
			});

			if (newFiles.length > 0) {
				form.setValue("images", [...watchedImages, ...newFiles], {
					shouldValidate: true,
				});
				toast.success(`${newFiles.length}個の画像を追加しました`);
			}
		}
	};

	const removeImage = (index: number) => {
		const newImages = watchedImages.filter(
			(_file: File, i: number) => i !== index,
		);
		form.setValue("images", newImages, { shouldValidate: true });
		toast.info("画像を削除しました");
	};

	// フォームリセット処理
	const handleCancel = () => {
		if (form.formState.isDirty) {
			const confirmed = window.confirm(
				"変更内容が保存されていません。本当にキャンセルしますか？",
			);
			if (!confirmed) return;
		}
		form.reset();
		router.push("/admin/products");
	};

	return {
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
	};
}
