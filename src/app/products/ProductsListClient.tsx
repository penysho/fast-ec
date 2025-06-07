"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ProductCard } from "~/components/ui/ProductCard";
import { api } from "~/trpc/react";

interface ProductsListClientProps {
	initialSearch?: string;
	initialCategory?: string;
}

/**
 * Products list client component
 *
 * Handles client-side functionality for the public products page including:
 * - Search and filtering
 * - Pagination
 * - Cart functionality
 * - Uses pre-fetched data from server component
 */
export function ProductsListClient({
	initialSearch,
	initialCategory
}: ProductsListClientProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [searchTerm, setSearchTerm] = useState(initialSearch || "");
	const [selectedCategory, setSelectedCategory] = useState(initialCategory || "");
	const [addingToCart, setAddingToCart] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;

	// Fetch products with current filters
	const { data: productsData, isLoading } = api.product.list.useQuery({
		limit: itemsPerPage,
		cursor: undefined,
		search: searchTerm || undefined,
		category: selectedCategory || undefined,
		status: "PUBLISHED",
	});

	// Fetch categories for filter dropdown
	const { data: categoriesData } = api.product.getCategories.useQuery();
	const categories = categoriesData ?? [];
	const products = productsData?.products ?? [];

	// Update URL when filters change
	useEffect(() => {
		const params = new URLSearchParams();
		if (searchTerm) params.set("search", searchTerm);
		if (selectedCategory) params.set("category", selectedCategory);

		const newUrl = params.toString() ? `?${params.toString()}` : "/products";
		router.replace(newUrl, { scroll: false });
	}, [searchTerm, selectedCategory, router]);

	const handleAddToCart = async (productId: string) => {
		setAddingToCart(productId);

		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Here you would implement actual cart functionality
		console.log(`Added product ${productId} to cart`);

		setAddingToCart(null);
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentPage(1);
	};

	const handleClearFilters = () => {
		setSearchTerm("");
		setSelectedCategory("");
		setCurrentPage(1);
	};

	return (
		<div className="space-y-6">
			{/* Search and Filter Section */}
			<div className="rounded-lg bg-white p-6 shadow-sm">
				<form onSubmit={handleSearchSubmit} className="space-y-4">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						{/* Search */}
						<div className="md:col-span-2">
							<label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
								商品を検索
							</label>
							<div className="relative">
								<input
									type="text"
									id="search"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
									placeholder="商品名で検索..."
								/>
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<title>検索</title>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
									</svg>
								</div>
							</div>
						</div>

						{/* Category Filter */}
						<div>
							<label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
								カテゴリー
							</label>
							<select
								id="category"
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
								className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500"
							>
								<option value="">すべて</option>
								{categories.map((category) => (
									<option key={category.id} value={category.name}>
										{category.name}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Action buttons */}
					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-600">
							{products.length} 件の商品が見つかりました
						</p>

						{(searchTerm || selectedCategory) && (
							<button
								type="button"
								onClick={handleClearFilters}
								className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
							>
								フィルターをクリア
							</button>
						)}
					</div>
				</form>
			</div>

			{/* Products Grid */}
			{isLoading ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{Array.from({ length: 8 }, (_, i) => (
						<div key={i} className="animate-pulse">
							<div className="aspect-square rounded-lg bg-gray-200 mb-4" />
							<div className="space-y-2">
								<div className="h-4 bg-gray-200 rounded w-3/4" />
								<div className="h-3 bg-gray-200 rounded w-1/2" />
								<div className="h-6 bg-gray-200 rounded w-1/3" />
							</div>
						</div>
					))}
				</div>
			) : products.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onAddToCart={handleAddToCart}
							isAddingToCart={addingToCart === product.id}
						/>
					))}
				</div>
			) : (
				<div className="rounded-lg bg-white p-12 text-center shadow-sm">
					<svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<title>商品なし</title>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
					</svg>
					<h3 className="text-lg font-semibold text-gray-900 mb-2">商品が見つかりません</h3>
					<p className="text-gray-600 mb-6">
						検索条件を変更するか、すべてのカテゴリーをご覧ください。
					</p>
					<button
						onClick={handleClearFilters}
						className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						すべての商品を見る
					</button>
				</div>
			)}
		</div>
	);
}
