import Link from "next/link";
import { Button } from "./Button";

interface HeaderProps {
	cartItemCount?: number;
	isAuthenticated?: boolean;
	userName?: string | null;
}

/**
 * Header component for the e-commerce site
 *
 * @param cartItemCount - Number of items in cart
 * @param isAuthenticated - Whether user is logged in
 * @param userName - Name of logged in user
 * @returns Header component with navigation and user actions
 */
export function Header({
	cartItemCount = 0,
	isAuthenticated = false,
	userName,
}: HeaderProps) {
	return (
		<header className="sticky top-0 z-50 border-gray-200 border-b bg-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
							<span className="font-bold text-sm text-white">EC</span>
						</div>
						<span className="font-bold text-gray-900 text-xl">Fast EC</span>
					</Link>

					{/* Navigation */}
					<nav className="hidden items-center space-x-8 md:flex">
						<Link
							href="/products"
							className="font-medium text-gray-700 transition-colors hover:text-gray-900"
						>
							商品一覧
						</Link>
						<Link
							href="/categories"
							className="font-medium text-gray-700 transition-colors hover:text-gray-900"
						>
							カテゴリー
						</Link>
						<Link
							href="/about"
							className="font-medium text-gray-700 transition-colors hover:text-gray-900"
						>
							会社概要
						</Link>
					</nav>

					{/* User Actions */}
					<div className="flex items-center space-x-4">
						{/* Search */}
						<button
							type="button"
							className="p-2 text-gray-400 transition-colors hover:text-gray-600"
						>
							<svg
								className="h-5 w-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>検索</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>

						{/* Cart */}
						<Link
							href="/cart"
							className="relative p-2 text-gray-400 transition-colors hover:text-gray-600"
						>
							<svg
								className="h-5 w-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>カート</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
								/>
							</svg>
							{cartItemCount > 0 && (
								<span className="-top-1 -right-1 absolute flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">
									{cartItemCount > 99 ? "99+" : cartItemCount}
								</span>
							)}
						</Link>

						{/* User Menu */}
						{isAuthenticated ? (
							<div className="flex items-center space-x-3">
								<span className="text-gray-700 text-sm">
									こんにちは、{userName}さん
								</span>
								<Link href="/api/auth/signout">
									<Button variant="outline" size="sm">
										ログアウト
									</Button>
								</Link>
							</div>
						) : (
							<div className="flex items-center space-x-2">
								<Link href="/api/auth/signin">
									<Button variant="ghost" size="sm">
										ログイン
									</Button>
								</Link>
								<Link href="/api/auth/signin">
									<Button variant="primary" size="sm">
										新規登録
									</Button>
								</Link>
							</div>
						)}

						{/* Mobile Menu Button */}
						<button
							type="button"
							className="p-2 text-gray-400 transition-colors hover:text-gray-600 md:hidden"
						>
							<svg
								className="h-5 w-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>メニュー</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
