"use client";

import Link from "next/link";
import { useState } from "react";

interface ProductForm {
	name: string;
	description: string;
	category: string;
	price: string;
	stock: string;
	status: string;
	tags: string;
	metaTitle: string;
	metaDescription: string;
	images: File[];
}

interface FormErrors {
	name?: string;
	description?: string;
	category?: string;
	price?: string;
	stock?: string;
	status?: string;
	tags?: string;
	metaTitle?: string;
	metaDescription?: string;
	images?: string;
}

const categories = [
	"衣類",
	"靴",
	"アクセサリー",
	"電子機器",
	"本・雑誌",
	"スポーツ",
	"その他",
];
const statuses = [
	{ value: "draft", label: "下書き" },
	{ value: "published", label: "公開" },
];

export default function NewProductPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});
	const [form, setForm] = useState<ProductForm>({
		name: "",
		description: "",
		category: categories[0] || "衣類",
		price: "",
		stock: "",
		status: "draft",
		tags: "",
		metaTitle: "",
		metaDescription: "",
		images: [],
	});

	const [dragActive, setDragActive] = useState(false);

	// フォーム更新
	const updateForm = (field: keyof ProductForm, value: string | File[]) => {
		setForm((prev) => ({ ...prev, [field]: value }));
		// エラーをクリア
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	// バリデーション
	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!form.name.trim()) {
			newErrors.name = "商品名は必須です";
		}

		if (!form.description.trim()) {
			newErrors.description = "商品説明は必須です";
		}

		if (!form.price.trim()) {
			newErrors.price = "価格は必須です";
		} else if (Number.isNaN(Number(form.price)) || Number(form.price) <= 0) {
			newErrors.price = "正しい価格を入力してください";
		}

		if (!form.stock.trim()) {
			newErrors.stock = "在庫数は必須です";
		} else if (Number.isNaN(Number(form.stock)) || Number(form.stock) < 0) {
			newErrors.stock = "正しい在庫数を入力してください";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// 保存処理
	const handleSave = async () => {
		if (!validateForm()) return;

		setIsLoading(true);
		try {
			// TODO: API呼び出し
			await new Promise((resolve) => setTimeout(resolve, 1000)); // ダミー処理
			console.log("商品保存:", form);
			// 成功時の処理（リダイレクトなど）
		} catch (error) {
			console.error("保存エラー:", error);
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
			const newFiles = Array.from(e.dataTransfer.files);
			updateForm("images", [...form.images, ...newFiles]);
		}
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files);
			updateForm("images", [...form.images, ...newFiles]);
		}
	};

	const removeImage = (index: number) => {
		const newImages = form.images.filter((_, i) => i !== index);
		updateForm("images", newImages);
	};

	return (
		<div className="space-y-6">
			{/* ページヘッダー */}
			<div className="border-gray-200 border-b pb-4">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="font-bold text-2xl text-gray-900">新商品追加</h1>
						<p className="mt-1 text-gray-600 text-sm">新しい商品を登録します</p>
					</div>
					<div className="flex space-x-3">
						<Link
							href="/admin/products"
							className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							キャンセル
						</Link>
						<button
							type="button"
							onClick={handleSave}
							disabled={isLoading}
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

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* メインコンテンツ */}
				<div className="space-y-6 lg:col-span-2">
					{/* 基本情報 */}
					<div className="rounded-lg bg-white p-6 shadow">
						<h3 className="mb-4 font-medium text-gray-900 text-lg">基本情報</h3>
						<div className="space-y-4">
							{/* 商品名 */}
							<div>
								<label
									htmlFor="name"
									className="block font-medium text-gray-700 text-sm"
								>
									商品名 <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="name"
									value={form.name}
									onChange={(e) => updateForm("name", e.target.value)}
									className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring-indigo-500 sm:text-sm ${
										errors.name
											? "border-red-300 focus:border-red-500"
											: "border-gray-300 focus:border-indigo-500"
									}`}
									placeholder="商品名を入力してください"
								/>
								{errors.name && (
									<p className="mt-1 text-red-600 text-sm">{errors.name}</p>
								)}
							</div>

							{/* 商品説明 */}
							<div>
								<label
									htmlFor="description"
									className="block font-medium text-gray-700 text-sm"
								>
									商品説明 <span className="text-red-500">*</span>
								</label>
								<textarea
									id="description"
									rows={4}
									value={form.description}
									onChange={(e) => updateForm("description", e.target.value)}
									className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring-indigo-500 sm:text-sm ${
										errors.description
											? "border-red-300 focus:border-red-500"
											: "border-gray-300 focus:border-indigo-500"
									}`}
									placeholder="商品の説明を入力してください"
								/>
								{errors.description && (
									<p className="mt-1 text-red-600 text-sm">
										{errors.description}
									</p>
								)}
							</div>

							{/* カテゴリー */}
							<div>
								<label
									htmlFor="category"
									className="block font-medium text-gray-700 text-sm"
								>
									カテゴリー
								</label>
								<select
									id="category"
									value={form.category}
									onChange={(e) => updateForm("category", e.target.value)}
									className="mt-1 block w-full rounded-md border border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								>
									{categories.map((category) => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					{/* 価格・在庫 */}
					<div className="rounded-lg bg-white p-6 shadow">
						<h3 className="mb-4 font-medium text-gray-900 text-lg">
							価格・在庫
						</h3>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							{/* 価格 */}
							<div>
								<label
									htmlFor="price"
									className="block font-medium text-gray-700 text-sm"
								>
									価格 <span className="text-red-500">*</span>
								</label>
								<div className="relative mt-1">
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										<span className="text-gray-500 sm:text-sm">¥</span>
									</div>
									<input
										type="number"
										id="price"
										value={form.price}
										onChange={(e) => updateForm("price", e.target.value)}
										className={`block w-full rounded-md border py-2 pr-3 pl-7 shadow-sm focus:ring-indigo-500 sm:text-sm ${
											errors.price
												? "border-red-300 focus:border-red-500"
												: "border-gray-300 focus:border-indigo-500"
										}`}
										placeholder="0"
										min="0"
									/>
								</div>
								{errors.price && (
									<p className="mt-1 text-red-600 text-sm">{errors.price}</p>
								)}
							</div>

							{/* 在庫数 */}
							<div>
								<label
									htmlFor="stock"
									className="block font-medium text-gray-700 text-sm"
								>
									在庫数 <span className="text-red-500">*</span>
								</label>
								<input
									type="number"
									id="stock"
									value={form.stock}
									onChange={(e) => updateForm("stock", e.target.value)}
									className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring-indigo-500 sm:text-sm ${
										errors.stock
											? "border-red-300 focus:border-red-500"
											: "border-gray-300 focus:border-indigo-500"
									}`}
									placeholder="0"
									min="0"
								/>
								{errors.stock && (
									<p className="mt-1 text-red-600 text-sm">{errors.stock}</p>
								)}
							</div>
						</div>
					</div>

					{/* 商品画像 */}
					<div className="rounded-lg bg-white p-6 shadow">
						<h3 className="mb-4 font-medium text-gray-900 text-lg">商品画像</h3>

						{/* ドラッグ&ドロップエリア */}
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

						{/* 選択された画像のプレビュー */}
						{form.images.length > 0 && (
							<div className="mt-4">
								<h4 className="mb-2 font-medium text-gray-900 text-sm">
									選択された画像 ({form.images.length})
								</h4>
								<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
									{form.images.map((file, index) => (
										<div key={`${file.name}-${index}`} className="relative">
											<img
												src={URL.createObjectURL(file)}
												alt={`プレビュー ${index + 1}`}
												className="h-24 w-full rounded-lg object-cover"
											/>
											<button
												type="button"
												onClick={() => removeImage(index)}
												className="-top-2 -right-2 absolute rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200"
											>
												<svg
													className="h-4 w-4"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<title>削除アイコン</title>
													<path
														fillRule="evenodd"
														d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
														clipRule="evenodd"
													/>
												</svg>
											</button>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* サイドバー */}
				<div className="space-y-6">
					{/* 公開設定 */}
					<div className="rounded-lg bg-white p-6 shadow">
						<h3 className="mb-4 font-medium text-gray-900 text-lg">公開設定</h3>
						<div className="space-y-4">
							<div>
								<fieldset>
									<legend className="block font-medium text-gray-700 text-sm">
										ステータス
									</legend>
									<div className="mt-2 space-y-2">
										{statuses.map((status) => (
											<label key={status.value} className="flex items-center">
												<input
													type="radio"
													name="status"
													value={status.value}
													checked={form.status === status.value}
													onChange={(e) => updateForm("status", e.target.value)}
													className="text-indigo-600 focus:ring-indigo-500"
												/>
												<span className="ml-2 text-gray-700 text-sm">
													{status.label}
												</span>
											</label>
										))}
									</div>
								</fieldset>
							</div>
						</div>
					</div>

					{/* タグ */}
					<div className="rounded-lg bg-white p-6 shadow">
						<h3 className="mb-4 font-medium text-gray-900 text-lg">タグ</h3>
						<div>
							<label
								htmlFor="tags"
								className="block font-medium text-gray-700 text-sm"
							>
								商品タグ
							</label>
							<input
								type="text"
								id="tags"
								value={form.tags}
								onChange={(e) => updateForm("tags", e.target.value)}
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="カンマ区切りで入力"
							/>
							<p className="mt-1 text-gray-500 text-xs">
								例: 夏物, セール, 新作
							</p>
						</div>
					</div>

					{/* SEO設定 */}
					<div className="rounded-lg bg-white p-6 shadow">
						<h3 className="mb-4 font-medium text-gray-900 text-lg">SEO設定</h3>
						<div className="space-y-4">
							<div>
								<label
									htmlFor="metaTitle"
									className="block font-medium text-gray-700 text-sm"
								>
									メタタイトル
								</label>
								<input
									type="text"
									id="metaTitle"
									value={form.metaTitle}
									onChange={(e) => updateForm("metaTitle", e.target.value)}
									className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									placeholder="SEO用のタイトル"
								/>
								<p className="mt-1 text-gray-500 text-xs">
									空白の場合は商品名が使用されます
								</p>
							</div>

							<div>
								<label
									htmlFor="metaDescription"
									className="block font-medium text-gray-700 text-sm"
								>
									メタディスクリプション
								</label>
								<textarea
									id="metaDescription"
									rows={3}
									value={form.metaDescription}
									onChange={(e) =>
										updateForm("metaDescription", e.target.value)
									}
									className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									placeholder="SEO用の説明文"
								/>
								<p className="mt-1 text-gray-500 text-xs">
									検索結果に表示される説明文（160文字以内推奨）
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
