import Link from "next/link";

/**
 * Footer component for the e-commerce site
 *
 * @returns Footer component with links and company information
 */
export function Footer() {
	return (
		<footer className="bg-gray-900 text-white">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					{/* Company Info */}
					<div className="col-span-1 md:col-span-2">
						<div className="mb-4 flex items-center space-x-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
								<span className="font-bold text-gray-900 text-sm">EC</span>
							</div>
							<span className="font-bold text-xl">Fast EC</span>
						</div>
						<p className="mb-4 max-w-md text-gray-300">
							高品質な商品を手頃な価格でお届けする、信頼のECサイトです。
							お客様の満足を第一に、迅速で丁寧なサービスを心がけています。
						</p>
						<div className="flex space-x-4">
							<Link
								href="#"
								className="text-gray-300 transition-colors hover:text-white"
							>
								<svg
									className="h-5 w-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Twitter</title>
									<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
								</svg>
							</Link>
							<Link
								href="#"
								className="text-gray-300 transition-colors hover:text-white"
							>
								<svg
									className="h-5 w-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Facebook</title>
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
							</Link>
							<Link
								href="#"
								className="text-gray-300 transition-colors hover:text-white"
							>
								<svg
									className="h-5 w-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Instagram</title>
									<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z" />
								</svg>
							</Link>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="mb-4 font-semibold text-lg">クイックリンク</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/products"
									className="text-gray-300 transition-colors hover:text-white"
								>
									商品一覧
								</Link>
							</li>
							<li>
								<Link
									href="/categories"
									className="text-gray-300 transition-colors hover:text-white"
								>
									カテゴリー
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="text-gray-300 transition-colors hover:text-white"
								>
									会社概要
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-gray-300 transition-colors hover:text-white"
								>
									お問い合わせ
								</Link>
							</li>
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h3 className="mb-4 font-semibold text-lg">カスタマーサービス</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/help"
									className="text-gray-300 transition-colors hover:text-white"
								>
									ヘルプ
								</Link>
							</li>
							<li>
								<Link
									href="/shipping"
									className="text-gray-300 transition-colors hover:text-white"
								>
									配送について
								</Link>
							</li>
							<li>
								<Link
									href="/returns"
									className="text-gray-300 transition-colors hover:text-white"
								>
									返品・交換
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="text-gray-300 transition-colors hover:text-white"
								>
									プライバシーポリシー
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="text-gray-300 transition-colors hover:text-white"
								>
									利用規約
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-8 flex flex-col items-center justify-between border-gray-800 border-t pt-8 md:flex-row">
					<p className="text-gray-300 text-sm">
						© 2024 Fast EC. All rights reserved.
					</p>
					<div className="mt-4 flex space-x-6 md:mt-0">
						<Link
							href="/privacy"
							className="text-gray-300 text-sm transition-colors hover:text-white"
						>
							プライバシーポリシー
						</Link>
						<Link
							href="/terms"
							className="text-gray-300 text-sm transition-colors hover:text-white"
						>
							利用規約
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
