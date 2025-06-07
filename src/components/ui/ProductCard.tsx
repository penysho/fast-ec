import Image from "next/image";
import Link from "next/link";
import type { Product } from "~/types/product";
import { Button } from "./Button";

interface ProductCardProps {
	product: Product;
	onAddToCart?: (productId: string) => void;
	isAddingToCart?: boolean;
}

/**
 * Product card component for displaying product information
 *
 * @param product - Product data to display
 * @param onAddToCart - Handler for adding product to cart
 * @param isAddingToCart - Loading state for add to cart action
 * @returns Product card component
 */
export function ProductCard({
	product,
	onAddToCart,
	isAddingToCart = false,
}: ProductCardProps) {
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("ja-JP", {
			style: "currency",
			currency: "JPY",
		}).format(price);
	};

	const primaryImage = product.images?.[0]?.url;

	return (
		<div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
			{/* Product Image */}
			<Link
				href={`/products/${product.id}`}
				className="relative block aspect-square overflow-hidden bg-gray-100"
			>
				{primaryImage ? (
					<Image
						src={primaryImage}
						alt={product.name}
						fill
						className="object-cover transition-transform duration-200 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center text-gray-400">
						<svg
							className="h-12 w-12"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>商品画像なし</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
				)}

				{/* Stock Badge */}
				{product.stock === 0 && (
					<div className="absolute top-2 left-2 rounded bg-red-500 px-2 py-1 text-white text-xs">
						在庫切れ
					</div>
				)}
			</Link>

			{/* Product Info */}
			<div className="p-4">
				<Link href={`/products/${product.id}`} className="block">
					<h3 className="mb-1 line-clamp-2 font-medium text-gray-900 text-sm group-hover:text-gray-700">
						{product.name}
					</h3>
				</Link>

				<p className="mb-2 line-clamp-2 text-gray-600 text-xs">
					{product.description}
				</p>

				<div className="flex items-center justify-between">
					<div className="flex flex-col">
						<span className="font-semibold text-gray-900 text-lg">
							{formatPrice(product.price)}
						</span>
						{product.stock > 0 && (
							<span className="text-gray-500 text-xs">
								在庫: {product.stock}個
							</span>
						)}
					</div>

					{onAddToCart && (
						<Button
							size="sm"
							variant="primary"
							onClick={() => onAddToCart(product.id)}
							disabled={product.stock === 0 || isAddingToCart}
							isLoading={isAddingToCart}
							className="text-xs"
						>
							{product.stock === 0 ? "在庫切れ" : "カートに追加"}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
