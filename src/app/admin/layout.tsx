import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export const metadata: Metadata = {
	title: "管理画面 - Fast EC",
	description: "EC管理画面",
};

async function AdminLayoutInner({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="flex min-h-screen">
				{/* サイドバーはログイン後に表示 */}
				{session && (
					<aside className="w-64 bg-white shadow-lg">
						<div className="border-b p-6">
							<h1 className="font-bold text-gray-800 text-xl">
								Fast EC 管理画面
							</h1>
							<p className="mt-1 text-gray-600 text-sm">
								ようこそ、{session.user?.name || session.user?.email}
							</p>
						</div>
						<nav className="p-4">
							<ul className="space-y-2">
								<li>
									<a
										href="/admin/dashboard"
										className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
									>
										ダッシュボード
									</a>
								</li>
								<li>
									<a
										href="/admin/products"
										className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
									>
										商品管理
									</a>
								</li>
								<li>
									<a
										href="/admin/orders"
										className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
									>
										注文管理
									</a>
								</li>
								<li>
									<a
										href="/admin/users"
										className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
									>
										顧客管理
									</a>
								</li>
							</ul>
						</nav>

						{/* ログアウトボタン */}
						<div className="absolute right-4 bottom-4 left-4">
							<form action="/api/auth/signout" method="post">
								<button
									type="submit"
									className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 font-medium text-gray-700 text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									ログアウト
								</button>
							</form>
						</div>
					</aside>
				)}

				{/* メインコンテンツ */}
				<main className={session ? "flex-1 p-6" : "flex-1"}>{children}</main>
			</div>
		</div>
	);
}

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AdminLayoutInner>{children}</AdminLayoutInner>;
}
