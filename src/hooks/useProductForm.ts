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

export function useProductForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [dragActive, setDragActive] = useState(false);
	const router = useRouter();
	const toast = useToast();

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
		try {
			// TODO: API呼び出し
			await new Promise((resolve) => setTimeout(resolve, 1000));
			console.log("商品保存:", data);

			// 成功時の処理
			toast.success("商品を保存しました", "商品が正常に登録されました");

			// 商品一覧ページにリダイレクト
			setTimeout(() => {
				router.push("/admin/products");
			}, 1500);
		} catch (error) {
			console.error("保存エラー:", error);
			toast.error("保存に失敗しました", "もう一度お試しください");
		} finally {
			setIsLoading(false);
		}
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
