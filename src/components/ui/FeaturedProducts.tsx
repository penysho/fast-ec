import Link from "next/link";
import type { Product } from "~/types/product";
import { Button } from "./Button";
import { ProductCard } from "./ProductCard";

interface FeaturedProductsProps {
	products: Product[];
	onAddToCart?: (productId: string) => void;
	isLoading?: boolean;
}

/**
 * Featured products section for homepage
 *
 * @param products - Array of featured products to display
 * @param onAddToCart - Handler for adding product to cart
 * @param isLoading - Loading state for the section
 * @returns Featured products section component
 */
export function FeaturedProducts({
	products,
	onAddToCart,
	isLoading = false,
}: FeaturedProductsProps) {
	if (isLoading) {
		return (
			<section className="bg-gray-50 py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-12 text-center">
						<h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
							注目商品
						</h2>
						<p className="mx-auto max-w-2xl text-gray-600 text-lg">
							厳選された人気商品をご紹介します
						</p>
					</div>

					{/* Loading Skeleton */}
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{Array.from(
							{ length: 8 },
							(_, i) => `loading-${Date.now()}-${i}`,
						).map((skeletonId) => (
							<div
								key={skeletonId}
								className="animate-pulse overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
							>
								<div className="aspect-square bg-gray-200" />
								<div className="p-4">
									<div className="mb-2 h-4 rounded bg-gray-200" />
									<div className="mb-2 h-3 w-3/4 rounded bg-gray-200" />
									<div className="h-6 w-1/2 rounded bg-gray-200" />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="bg-gray-50 py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 text-center">
					<h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
						注目商品
					</h2>
					<p className="mx-auto max-w-2xl text-gray-600 text-lg">
						厳選された人気商品をご紹介します。高品質で手頃な価格の商品を取り揃えています。
					</p>
				</div>

				{products.length === 0 ? (
					<div className="py-12 text-center">
						<div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
							<svg
								className="h-12 w-12 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>商品なし</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
								/>
							</svg>
						</div>
						<h3 className="mb-2 font-semibold text-gray-900 text-xl">
							商品が見つかりません
						</h3>
						<p className="mb-6 text-gray-600">
							現在表示できる商品がありません。後ほど再度お試しください。
						</p>
						<Link href="/products">
							<Button variant="primary">全商品を見る</Button>
						</Link>
					</div>
				) : (
					<>
						<div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{products.slice(0, 8).map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									onAddToCart={onAddToCart}
								/>
							))}
						</div>

						<div className="text-center">
							<Link href="/products">
								<Button variant="outline" size="lg" className="px-8">
									すべての商品を見る
								</Button>
							</Link>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
