import Link from "next/link";
import { Button } from "./Button";

/**
 * Hero section component for the homepage
 *
 * @returns Hero section with main call-to-action
 */
export function HeroSection() {
	return (
		<section className="relative overflow-hidden bg-gray-900 text-white">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
				<div className="absolute inset-0 bg-black/20" />
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/50 to-transparent" />
			</div>

			{/* Content */}
			<div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
				<div className="text-center">
					<h1 className="mb-6 font-bold text-4xl tracking-tight md:text-6xl lg:text-7xl">
						<span className="block">高品質な商品を</span>
						<span className="block text-gray-300">手頃な価格で</span>
					</h1>

					<p className="mx-auto mb-8 max-w-3xl text-gray-300 text-xl leading-relaxed md:text-2xl">
						厳選された商品を、お客様のもとへ迅速にお届け。
						<br className="hidden sm:block" />
						信頼と品質を第一に、最高のショッピング体験をご提供します。
					</p>

					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Link href="/products">
							<Button size="lg" className="w-full px-8 py-4 text-lg sm:w-auto">
								商品を見る
							</Button>
						</Link>
						<Link href="/categories">
							<Button
								variant="outline"
								size="lg"
								className="w-full border-gray-300 px-8 py-4 text-gray-300 text-lg hover:bg-gray-300 hover:text-gray-900 sm:w-auto"
							>
								カテゴリー一覧
							</Button>
						</Link>
					</div>
				</div>

				{/* Features */}
				<div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
					<div className="text-center">
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
							<svg
								className="h-8 w-8"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>高品質</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h3 className="mb-2 font-semibold text-xl">高品質保証</h3>
						<p className="text-gray-300">
							厳格な品質管理のもと、選び抜かれた商品のみをお届けします。
						</p>
					</div>

					<div className="text-center">
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
							<svg
								className="h-8 w-8"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>迅速配送</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
						</div>
						<h3 className="mb-2 font-semibold text-xl">迅速配送</h3>
						<p className="text-gray-300">
							ご注文から最短翌日お届け。お急ぎの場合も安心してご利用いただけます。
						</p>
					</div>

					<div className="text-center">
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
							<svg
								className="h-8 w-8"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>安心サポート</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
								/>
							</svg>
						</div>
						<h3 className="mb-2 font-semibold text-xl">安心サポート</h3>
						<p className="text-gray-300">
							購入前後のサポートも充実。お困りの際はお気軽にお問い合わせください。
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
