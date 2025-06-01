"use client";
import { FormField } from "@/components/ui/FormField";
import { ImagePreview } from "@/components/ui/ImagePreview";
import { ToastContainer } from "@/components/ui/Toast";
import { useProductForm } from "@/hooks/useProductForm";
import { ProductCategories } from "@/types/product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

const statuses = [
	{ value: "draft" as const, label: "下書き" },
	{ value: "published" as const, label: "公開" },
];

export default function NewProductPage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	// 認証チェック
	useEffect(() => {
		if (status === "loading") return; // まだ認証状態を確認中

		if (!session) {
			router.push("/admin/login");
		}
	}, [session, status, router]);

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

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isValid },
	} = form;

	// 認証状態を確認中は読み込み画面を表示
	if (status === "loading") {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<div className="mx-auto h-12 w-12 animate-spin rounded-full border-indigo-600 border-b-2" />
					<p className="mt-4 text-gray-600">読み込み中...</p>
				</div>
			</div>
		);
	}

	// 未ログインの場合は何も表示しない（リダイレクト中）
	if (!session) {
		return null;
	}

	return (
		<div className="space-y-6">
			{/* 通知システム */}
			<ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

			{/* ページヘッダー */}
			<div className="border-gray-200 border-b pb-4">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="font-bold text-2xl text-gray-900">新商品追加</h1>
						<p className="mt-1 text-gray-600 text-sm">新しい商品を登録します</p>
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
										<title>保存中アイコン</title>
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
									保存中...
								</>
							) : (
								"商品を保存"
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
						<div className="rounded-lg bg-white p-6 shadow">
							<h3 className="mb-4 font-medium text-gray-900 text-lg">
								基本情報
							</h3>
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

						{/* 価格・在庫 */}
						<div className="rounded-lg bg-white p-6 shadow">
							<h3 className="mb-4 font-medium text-gray-900 text-lg">
								価格・在庫
							</h3>
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

						{/* 商品画像 */}
						<div className="rounded-lg bg-white p-6 shadow">
							<h3 className="mb-4 font-medium text-gray-900 text-lg">
								商品画像
							</h3>

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
					</div>

					{/* サイドバー */}
					<div className="space-y-6">
						{/* 公開設定 */}
						<div className="rounded-lg bg-white p-6 shadow">
							<h3 className="mb-4 font-medium text-gray-900 text-lg">
								公開設定
							</h3>
							<FormField label="ステータス" error={errors.status?.message}>
								<div className="mt-2 space-y-2">
									{statuses.map((status) => (
										<label key={status.value} className="flex items-center">
											<input
												{...register("status")}
												type="radio"
												value={status.value}
												className="text-indigo-600 focus:ring-indigo-500"
											/>
											<span className="ml-2 text-gray-700 text-sm">
												{status.label}
											</span>
										</label>
									))}
								</div>
							</FormField>
						</div>

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
							<h3 className="mb-4 font-medium text-gray-900 text-lg">
								SEO設定
							</h3>
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
					</div>
				</div>
			</form>
		</div>
	);
}
