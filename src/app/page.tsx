"use client";

import { useState } from "react";
import { CategorySection } from "~/components/ui/CategorySection";
import { FeaturedProducts } from "~/components/ui/FeaturedProducts";
import { Footer } from "~/components/ui/Footer";
import { Header } from "~/components/ui/Header";
import { HeroSection } from "~/components/ui/HeroSection";
import { api } from "~/trpc/react";

/**
 * Homepage component for the e-commerce site
 *
 * @returns Complete homepage with header, hero, categories, featured products, and footer
 */
export default function HomePage() {
	const [addingToCart, setAddingToCart] = useState<string | null>(null);

	// Fetch featured products (published products, limited to 8)
	const { data: productsData, isLoading: isProductsLoading } =
		api.product.list.useQuery({
			status: "PUBLISHED",
			limit: 8,
		});

	// Mock user session data - in real app, this would come from auth
	const mockSession = {
		isAuthenticated: false,
		userName: null,
		cartItemCount: 0,
	};

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
		<div className="min-h-screen bg-white">
			<Header
				cartItemCount={mockSession.cartItemCount}
				isAuthenticated={mockSession.isAuthenticated}
				userName={mockSession.userName}
			/>

			<main>
				<HeroSection />
				<CategorySection />
				<FeaturedProducts
					products={products}
					onAddToCart={handleAddToCart}
					isLoading={isProductsLoading}
				/>
			</main>

			<Footer />
		</div>
	);
}
