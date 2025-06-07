import type { Metadata } from "next";
import { HydrateClient, api } from "~/trpc/server";
import { ProductsClient } from "./ProductsClient";

export const metadata: Metadata = {
	title: "商品管理 - Fast EC",
	description: "商品の追加、編集、削除を行う管理画面",
};

/**
 * Admin products page - Server Component
 *
 * Fetches initial product data on the server for better performance and SEO,
 * then hydrates the client with this data for interactive features.
 */
export default async function AdminProductsPage() {
	// Fetch initial data on server side
	await api.product.list.prefetch({
		limit: 10,
		cursor: undefined,
		search: undefined,
		category: undefined,
		status: undefined,
	});

	// Fetch categories for filter dropdown
	await api.product.getCategories.prefetch();

	return (
		<HydrateClient>
			<ProductsClient />
		</HydrateClient>
	);
}
