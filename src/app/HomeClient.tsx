"use client";

import { useState } from "react";
import { FeaturedProducts } from "~/components/ui/FeaturedProducts";
import { api } from "~/trpc/react";

/**
 * Home page client component
 *
 * Handles client-side interactivity for the homepage including:
 * - Cart functionality
 * - Product interactions
 * - Uses pre-fetched data from server component
 */
export function HomeClient() {
	const [addingToCart, setAddingToCart] = useState<string | null>(null);

	// Use the data that was pre-fetched on the server
	const { data: productsData, isLoading: isProductsLoading } =
		api.product.list.useQuery({
			status: "PUBLISHED",
			limit: 8,
		});

	const handleAddToCart = async (productId: string) => {
		setAddingToCart(productId);

		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Here you would implement actual cart functionality
		console.log(`Added product ${productId} to cart`);

		setAddingToCart(null);
	};

	const products = productsData?.products || [];

	return (
		<FeaturedProducts
			products={products}
			onAddToCart={handleAddToCart}
			isLoading={isProductsLoading}
		/>
	);
}
