import Link from "next/link";
import { ProductCategories, type ProductCategory } from "~/types/product";

/**
 * Category section component for homepage
 *
 * @returns Category section with navigation to different product categories
 */
export function CategorySection() {
	const categoryIcons: Record<ProductCategory, React.JSX.Element> = {
		衣類: (
			<svg
				className="h-8 w-8"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<title>衣類</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
				/>
			</svg>
		),
		靴: (
			<svg
				className="h-8 w-8"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<title>靴</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11"
				/>
			</svg>
		),
		アクセサリー: (
			<svg
				className="h-8 w-8"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<title>アクセサリー</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
				/>
			</svg>
		),
		電子機器: (
			<svg
				className="h-8 w-8"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<title>電子機器</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>
		),
		本: (
			<svg
				className="h-8 w-8"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<title>本・雑誌</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
				/>
			</svg>
		),
		スポーツ: (
			<svg
				className="h-8 w-8"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<title>スポーツ</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M13 10V3L4 14h7v7l9-11h-7z"
				/>
			</svg>
		),
		その他: (
			<svg
				className="h-8 w-8"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<title>その他</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
				/>
			</svg>
		),
	};

	return (
		<section className="bg-white py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 text-center">
					<h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
						カテゴリー
					</h2>
					<p className="mx-auto max-w-2xl text-gray-600 text-lg">
						豊富なカテゴリーから、お探しの商品をお選びください
					</p>
				</div>

				<div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-7">
					{ProductCategories.map((category) => (
						<Link
							key={category}
							href={`/products?category=${encodeURIComponent(category)}`}
							className="group flex flex-col items-center rounded-lg bg-gray-50 p-6 transition-colors duration-200 hover:bg-gray-100"
						>
							<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white transition-shadow duration-200 group-hover:shadow-md">
								<div className="text-gray-600 transition-colors duration-200 group-hover:text-gray-900">
									{categoryIcons[category]}
								</div>
							</div>
							<span className="text-center font-medium text-gray-900 text-sm">
								{category}
							</span>
						</Link>
					))}
				</div>

				<div className="mt-12 text-center">
					<Link
						href="/categories"
						className="inline-flex items-center font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
					>
						すべてのカテゴリーを見る
						<svg
							className="ml-2 h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>矢印</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</Link>
				</div>
			</div>
		</section>
	);
}
