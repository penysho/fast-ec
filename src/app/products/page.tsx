import type { Metadata } from "next";
import { HydrateClient, api } from "~/trpc/server";
import { ProductsListClient } from "./ProductsListClient";

export const metadata: Metadata = {
	title: "商品一覧 - Fast EC",
	description: "厳選された商品をご覧ください",
};

/**
 * Public products listing page - Server Component
 *
 * Fetches initial product data on the server for better performance and SEO,
 * then hydrates the client with this data for interactive features like
 * filtering, searching, and pagination.
 */
export default async function ProductsPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const params = await searchParams;
	const category = typeof params.category === "string" ? params.category : undefined;
	const search = typeof params.search === "string" ? params.search : undefined;

	// Fetch initial data on server side
	await api.product.list.prefetch({
		limit: 12,
		cursor: undefined,
		search,
		category,
		status: "PUBLISHED", // Only show published products to public
	});

	// Fetch categories for filter dropdown
	await api.product.getCategories.prefetch();

	return (
		<div className="min-h-screen bg-gray-50">
			<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="mb-8">
					<h1 className="font-bold text-3xl text-gray-900">商品一覧</h1>
					<p className="mt-2 text-gray-600">
						厳選された高品質な商品をお求めやすい価格でご提供しています
					</p>
				</div>

				<HydrateClient>
					<ProductsListClient
						initialSearch={search}
						initialCategory={category}
					/>
				</HydrateClient>
			</main>
		</div>
	);
}
