"use client";

import Link from "next/link";
import { useState } from "react";

// ダミーデータ
const dummyProducts = [
	{
		id: 1,
		name: "プレミアムTシャツ",
		category: "衣類",
		price: 2980,
		stock: 45,
		status: "公開",
		image:
			"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop&crop=face",
		createdAt: "2024-01-15",
		updatedAt: "2024-01-20",
	},
	{
		id: 2,
		name: "デニムジャケット",
		category: "衣類",
		price: 8980,
		stock: 12,
		status: "公開",
		image:
			"https://images.unsplash.com/photo-1544966503-7cc5ac882d2c?w=80&h=80&fit=crop&crop=face",
		createdAt: "2024-01-10",
		updatedAt: "2024-01-18",
	},
	{
		id: 3,
		name: "スニーカー",
		category: "靴",
		price: 12800,
		stock: 8,
		status: "下書き",
		image:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop&crop=face",
		createdAt: "2024-01-08",
		updatedAt: "2024-01-19",
	},
	{
		id: 4,
		name: "レザーバッグ",
		category: "アクセサリー",
		price: 24800,
		stock: 0,
		status: "在庫切れ",
		image:
			"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop&crop=face",
		createdAt: "2024-01-05",
		updatedAt: "2024-01-17",
	},
	{
		id: 5,
		name: "腕時計",
		category: "アクセサリー",
		price: 45000,
		stock: 23,
		status: "公開",
		image:
			"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&crop=face",
		createdAt: "2024-01-12",
		updatedAt: "2024-01-21",
	},
];

const categories = ["すべて", "衣類", "靴", "アクセサリー"];
const statuses = ["すべて", "公開", "下書き", "在庫切れ"];

/**
 * Products client component
 *
 * Handles client-side functionality for the products management page including:
 * - Search and filtering
 * - Pagination
 * - Product interactions
 *
 * @returns Product management interface with interactive features
 */
export function ProductsClient() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("すべて");
	const [selectedStatus, setSelectedStatus] = useState("すべて");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

	// フィルタリング
	const filteredProducts = dummyProducts.filter((product) => {
		const matchesSearch = product.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "すべて" || product.category === selectedCategory;
		const matchesStatus =
			selectedStatus === "すべて" || product.status === selectedStatus;
		return matchesSearch && matchesCategory && matchesStatus;
	});

	// ページネーション
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedProducts = filteredProducts.slice(
		startIndex,
		startIndex + itemsPerPage,
	);

	const getStatusBadge = (status: string) => {
		const baseClasses =
			"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
		switch (status) {
			case "公開":
				return `${baseClasses} bg-green-100 text-green-800`;
			case "下書き":
				return `${baseClasses} bg-yellow-100 text-yellow-800`;
			case "在庫切れ":
				return `${baseClasses} bg-red-100 text-red-800`;
			default:
				return `${baseClasses} bg-gray-100 text-gray-800`;
		}
	};

	return (
		<div className="space-y-6">
			{/* ページヘッダー */}
			<div className="border-gray-200 border-b pb-4 sm:flex sm:items-center sm:justify-between">
				<div>
					<h1 className="font-bold text-2xl text-gray-900">商品管理</h1>
					<p className="mt-1 text-gray-600 text-sm">
						商品の追加、編集、削除を行うことができます
					</p>
				</div>
				<div className="mt-3 sm:mt-0 sm:ml-4">
					<Link
						href="/admin/products/new"
						className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 font-semibold text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2"
					>
						<svg
							className="-ml-0.5 mr-1.5 h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>追加アイコン</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
						</svg>
						新規商品を追加
					</Link>
				</div>
			</div>

			{/* 検索・フィルター */}
			<div className="rounded-lg bg-white p-6 shadow">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
					{/* 検索 */}
					<div className="md:col-span-2">
						<label
							htmlFor="search"
							className="block font-medium text-gray-700 text-sm"
						>
							商品名で検索
						</label>
						<div className="relative mt-1">
							<input
								type="text"
								id="search"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="商品名を入力..."
							/>
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<svg
									className="h-5 w-5 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>検索アイコン</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</div>
						</div>
					</div>

					{/* カテゴリーフィルター */}
					<div>
						<label
							htmlFor="category"
							className="block font-medium text-gray-700 text-sm"
						>
							カテゴリー
						</label>
						<select
							id="category"
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="mt-1 block w-full rounded-md border border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>

					{/* ステータスフィルター */}
					<div>
						<label
							htmlFor="status"
							className="block font-medium text-gray-700 text-sm"
						>
							ステータス
						</label>
						<select
							id="status"
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
							className="mt-1 block w-full rounded-md border border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						>
							{statuses.map((status) => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* 検索結果数 */}
				<div className="mt-4 flex items-center justify-between">
					<p className="text-gray-700 text-sm">
						{filteredProducts.length} 件の商品が見つかりました
					</p>
					{(searchTerm ||
						selectedCategory !== "すべて" ||
						selectedStatus !== "すべて") && (
						<button
							type="button"
							onClick={() => {
								setSearchTerm("");
								setSelectedCategory("すべて");
								setSelectedStatus("すべて");
								setCurrentPage(1);
							}}
							className="font-medium text-indigo-600 text-sm hover:text-indigo-500"
						>
							フィルターをクリア
						</button>
					)}
				</div>
			</div>

			{/* 商品テーブル */}
			<div className="overflow-hidden rounded-lg bg-white shadow">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
									商品
								</th>
								<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
									カテゴリー
								</th>
								<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
									価格
								</th>
								<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
									在庫
								</th>
								<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
									ステータス
								</th>
								<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
									更新日
								</th>
								<th className="relative px-6 py-3">
									<span className="sr-only">操作</span>
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{paginatedProducts.length > 0 ? (
								paginatedProducts.map((product) => (
									<tr key={product.id} className="hover:bg-gray-50">
										<td className="whitespace-nowrap px-6 py-4">
											<div className="flex items-center">
												<div className="h-10 w-10 flex-shrink-0">
													<img
														className="h-10 w-10 rounded-full object-cover"
														src={product.image}
														alt={product.name}
													/>
												</div>
												<div className="ml-4">
													<div className="font-medium text-gray-900 text-sm">
														{product.name}
													</div>
													<div className="text-gray-500 text-sm">
														ID: {product.id}
													</div>
												</div>
											</div>
										</td>
										<td className="whitespace-nowrap px-6 py-4">
											<div className="text-gray-900 text-sm">
												{product.category}
											</div>
										</td>
										<td className="whitespace-nowrap px-6 py-4">
											<div className="font-medium text-gray-900 text-sm">
												¥{product.price.toLocaleString()}
											</div>
										</td>
										<td className="whitespace-nowrap px-6 py-4">
											<div
												className={`text-sm ${
													product.stock === 0 ? "text-red-600" : "text-gray-900"
												}`}
											>
												{product.stock === 0
													? "在庫切れ"
													: `${product.stock}個`}
											</div>
										</td>
										<td className="whitespace-nowrap px-6 py-4">
											<span className={getStatusBadge(product.status)}>
												{product.status}
											</span>
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
											{product.updatedAt}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-right font-medium text-sm">
											<div className="flex items-center space-x-2">
												<Link
													href={`/admin/products/${product.id}`}
													className="text-indigo-600 hover:text-indigo-900"
												>
													編集
												</Link>
												<button
													type="button"
													className="text-red-600 hover:text-red-900"
													onClick={() => {
														if (
															confirm(`「${product.name}」を削除しますか？`)
														) {
															// TODO: 削除処理
															console.log("削除:", product.id);
														}
													}}
												>
													削除
												</button>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={7} className="px-6 py-12 text-center">
										<div className="text-center">
											<svg
												className="mx-auto h-12 w-12 text-gray-400"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<title>商品なしアイコン</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
												/>
											</svg>
											<p className="mt-2 font-medium text-gray-900 text-sm">
												商品が見つかりません
											</p>
											<p className="mt-1 text-gray-500 text-sm">
												検索条件を変更するか、新しい商品を追加してください。
											</p>
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* ページネーション */}
				{totalPages > 1 && (
					<div className="flex items-center justify-between border-gray-200 border-t bg-white px-4 py-3 sm:px-6">
						<div className="flex flex-1 justify-between sm:hidden">
							<button
								type="button"
								onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
								disabled={currentPage === 1}
								className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
							>
								前へ
							</button>
							<button
								type="button"
								onClick={() =>
									setCurrentPage(Math.min(totalPages, currentPage + 1))
								}
								disabled={currentPage === totalPages}
								className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
							>
								次へ
							</button>
						</div>
						<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
							<div>
								<p className="text-gray-700 text-sm">
									<span className="font-medium">{startIndex + 1}</span> から{" "}
									<span className="font-medium">
										{Math.min(
											startIndex + itemsPerPage,
											filteredProducts.length,
										)}
									</span>{" "}
									まで表示中 (全{" "}
									<span className="font-medium">{filteredProducts.length}</span>{" "}
									件)
								</p>
							</div>
							<div>
								<nav className="-space-x-px isolate inline-flex rounded-md shadow-sm">
									<button
										type="button"
										onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
										disabled={currentPage === 1}
										className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
									>
										<span className="sr-only">前のページ</span>
										<svg
											className="h-5 w-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<title>前へアイコン</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 19l-7-7 7-7"
											/>
										</svg>
									</button>

									{[...Array(totalPages)].map((_, index) => {
										const pageNumber = index + 1;
										return (
											<button
												type="button"
												key={pageNumber}
												onClick={() => setCurrentPage(pageNumber)}
												className={`relative inline-flex items-center px-4 py-2 font-semibold text-sm ${
													pageNumber === currentPage
														? "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2"
														: "text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
												}`}
											>
												{pageNumber}
											</button>
										);
									})}

									<button
										type="button"
										onClick={() =>
											setCurrentPage(Math.min(totalPages, currentPage + 1))
										}
										disabled={currentPage === totalPages}
										className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
									>
										<span className="sr-only">次のページ</span>
										<svg
											className="h-5 w-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<title>次へアイコン</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</button>
								</nav>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
