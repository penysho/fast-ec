import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ダッシュボード - Fast EC",
	description: "管理システムの概要ダッシュボード",
};

export default function AdminDashboardPage() {
	return (
		<div className="space-y-6">
			{/* ページヘッダー */}
			<div className="border-gray-200 border-b pb-4">
				<h1 className="font-bold text-2xl text-gray-900">ダッシュボード</h1>
				<p className="mt-1 text-gray-600 text-sm">
					Fast EC 管理システムの概要をご確認いただけます
				</p>
			</div>

			{/* 統計カード */}
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
				<div className="overflow-hidden rounded-lg bg-white shadow">
					<div className="p-5">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<svg
									className="h-6 w-6 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>商品アイコン</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
									/>
								</svg>
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="truncate font-medium text-gray-500 text-sm">
										総商品数
									</dt>
									<dd className="font-medium text-gray-900 text-lg">0</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>

				<div className="overflow-hidden rounded-lg bg-white shadow">
					<div className="p-5">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<svg
									className="h-6 w-6 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>注文アイコン</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
									/>
								</svg>
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="truncate font-medium text-gray-500 text-sm">
										今月の注文数
									</dt>
									<dd className="font-medium text-gray-900 text-lg">0</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>

				<div className="overflow-hidden rounded-lg bg-white shadow">
					<div className="p-5">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<svg
									className="h-6 w-6 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>顧客アイコン</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
									/>
								</svg>
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="truncate font-medium text-gray-500 text-sm">
										総顧客数
									</dt>
									<dd className="font-medium text-gray-900 text-lg">0</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>

				<div className="overflow-hidden rounded-lg bg-white shadow">
					<div className="p-5">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<svg
									className="h-6 w-6 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>売上アイコン</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
									/>
								</svg>
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="truncate font-medium text-gray-500 text-sm">
										今月の売上
									</dt>
									<dd className="font-medium text-gray-900 text-lg">¥0</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 最近のアクティビティ */}
			<div className="rounded-lg bg-white shadow">
				<div className="px-4 py-5 sm:p-6">
					<h3 className="mb-4 font-medium text-gray-900 text-lg leading-6">
						最近のアクティビティ
					</h3>
					<div className="py-8 text-center">
						<svg
							className="mx-auto h-12 w-12 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>データなしアイコン</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						<p className="mt-2 text-gray-500 text-sm">
							まだアクティビティがありません
						</p>
					</div>
				</div>
			</div>

			{/* クイックアクション */}
			<div className="rounded-lg bg-white shadow">
				<div className="px-4 py-5 sm:p-6">
					<h3 className="mb-4 font-medium text-gray-900 text-lg leading-6">
						クイックアクション
					</h3>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<a
							href="/admin/products/new"
							className="relative block w-full rounded-lg border-2 border-gray-300 border-dashed p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<svg
								className="mx-auto h-8 w-8 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>商品追加アイコン</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								/>
							</svg>
							<span className="mt-2 block font-medium text-gray-900 text-sm">
								新商品を追加
							</span>
						</a>

						<a
							href="/admin/orders"
							className="relative block w-full rounded-lg border-2 border-gray-300 border-dashed p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<svg
								className="mx-auto h-8 w-8 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>注文管理アイコン</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								/>
							</svg>
							<span className="mt-2 block font-medium text-gray-900 text-sm">
								注文を管理
							</span>
						</a>

						<a
							href="/admin/users"
							className="relative block w-full rounded-lg border-2 border-gray-300 border-dashed p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<svg
								className="mx-auto h-8 w-8 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>顧客管理アイコン</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
								/>
							</svg>
							<span className="mt-2 block font-medium text-gray-900 text-sm">
								顧客を管理
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
