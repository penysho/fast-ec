"use client";

import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	HiOutlineChartBar,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
} from "react-icons/hi2";

interface AdminClientLayoutProps {
	children: React.ReactNode;
}

/**
 * Admin client-side layout component
 *
 * Handles client-side functionality including:
 * - Authentication guard
 * - Navigation state management
 * - User interactions (logout)
 *
 * @param children - Page content to render within the layout
 * @returns Client-side admin layout with authentication and navigation
 */
export function AdminClientLayout({ children }: AdminClientLayoutProps) {
	const { data: session } = useSession();
	const pathname = usePathname();

	if (pathname === "/admin/login") {
		return <>{children}</>;
	}

	const handleLogout = async () => {
		await signOut({ callbackUrl: "/admin/login" });
	};

	const isActivePath = (path: string) => {
		return pathname === path || pathname.startsWith(`${path}/`);
	};

	const navItems = [
		{
			href: "/admin/dashboard",
			label: "ダッシュボード",
			icon: HiOutlineChartBar,
		},
		{
			href: "/admin/products",
			label: "商品管理",
			icon: HiOutlineCube,
		},
		{
			href: "/admin/orders",
			label: "注文管理",
			icon: HiOutlineShoppingCart,
		},
		{
			href: "/admin/users",
			label: "顧客管理",
			icon: HiOutlineUsers,
		},
	];

	return (
		<AdminAuthGuard>
			<div className="min-h-screen bg-gray-50">
				<div className="flex min-h-screen">
					<aside className="flex w-64 flex-col bg-white shadow-lg">
						<div className="border-b p-6">
							<h1 className="font-bold text-gray-800 text-xl">
								Fast EC 管理サイト
							</h1>
							<p className="mt-1 text-gray-600 text-sm">
								ようこそ、{session?.user?.name || session?.user?.email}
							</p>
						</div>

						<nav className="flex-1 p-4">
							<ul className="space-y-2">
								{navItems.map((item) => {
									const IconComponent = item.icon;
									return (
										<li key={item.href}>
											<Link
												href={item.href}
												className={`flex items-center rounded-md px-4 py-2 text-sm transition-colors ${
													isActivePath(item.href)
														? "bg-indigo-100 font-medium text-indigo-700"
														: "text-gray-700 hover:bg-gray-100"
												}`}
											>
												<IconComponent className="mr-3 h-5 w-5" />
												{item.label}
											</Link>
										</li>
									);
								})}
							</ul>
						</nav>

						<div className="border-t p-4">
							<button
								type="button"
								onClick={handleLogout}
								className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 font-medium text-gray-700 text-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								ログアウト
							</button>
						</div>
					</aside>

					<main className="flex-1 p-6">{children}</main>
				</div>
			</div>
		</AdminAuthGuard>
	);
}
