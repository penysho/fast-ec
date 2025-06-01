import { useToast } from "@/hooks/useToast";
import { type ProductFormData, productSchema } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";

/**
 * Product edit form management hook
 *
 * Provides form state management, validation, and submission logic for product editing.
 * Includes existing data loading, image upload handling, drag & drop functionality,
 * and proper error handling.
 *
 * @param productId - ID of the product to edit
 * @returns Object containing form methods, state, and event handlers
 */
export function useProductEditForm(productId: string) {
	const [isLoading, setIsLoading] = useState(false);
	const [dragActive, setDragActive] = useState(false);
	const router = useRouter();
	const toast = useToast();
	const utils = api.useUtils();

	// 商品データの取得
	const { data: product, isLoading: isLoadingProduct } =
		api.product.getById.useQuery({ id: productId }, { enabled: !!productId });

	// 商品更新mutation
	const updateProduct = api.product.update.useMutation({
		onSuccess: () => {
			toast.success("商品を更新しました", "商品が正常に更新されました");
			utils.product.list.invalidate();
			utils.product.getById.invalidate({ id: productId });
			setTimeout(() => {
				router.push("/admin/products");
			}, 1500);
		},
		onError: (error) => {
			console.error("更新エラー:", error);

			// 認証エラーの場合はログインページにリダイレクト
			if (error.data?.code === "UNAUTHORIZED") {
				toast.error("認証が必要です", "ログインしてから再度お試しください");
				setTimeout(() => {
					router.push("/admin/login");
				}, 1500);
				return;
			}

			toast.error("更新に失敗しました", "もう一度お試しください");
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
			category: "衣類",
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

	// 商品データが取得できたらフォームに設定
	useEffect(() => {
		if (product) {
			// ステータスの変換：DBでは様々な形式、フォームでは英語
			let formStatus: "draft" | "published" = "draft";
			const statusValue = product.status as unknown;
			if (
				statusValue === "公開" ||
				statusValue === "PUBLISHED" ||
				statusValue === "published"
			) {
				formStatus = "published";
			}

			form.reset({
				name: product.name,
				description: product.description,
				category: product.category.name,
				price: product.price.toString(),
				stock: product.stock.toString(),
				status: formStatus,
				tags: product.tags?.join(", ") || "",
				metaTitle: product.metaTitle || "",
				metaDescription: product.metaDescription || "",
				images: [], // 既存の画像は別途処理
			});
		}
	}, [product, form]);

	const watchedImages = form.watch("images") || [];

	// フォーム送信処理
	const onSubmit = async (data: ProductFormData) => {
		setIsLoading(true);
		updateProduct.mutate({
			id: productId,
			...data,
		});
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
		router.push("/admin/products");
	};

	return {
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
	};
}
