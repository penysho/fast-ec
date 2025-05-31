"use client";

import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLoginPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	useEffect(() => {
		// 既にログイン済みの場合はダッシュボードにリダイレクト
		getSession().then((session) => {
			if (session) {
				router.push("/admin/dashboard");
			}
		});
	}, [router]);

	const handleSignIn = async (provider: string) => {
		try {
			setIsLoading(true);
			setError("");

			const result = await signIn(provider, {
				callbackUrl: "/admin/dashboard",
				redirect: false,
			});

			if (result?.error) {
				setError("ログインに失敗しました。もう一度お試しください。");
			} else {
				router.push("/admin/dashboard");
			}
		} catch (err) {
			setError("予期しないエラーが発生しました。");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				{/* ヘッダー */}
				<div className="text-center">
					<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-indigo-600">
						<svg
							className="h-8 w-8 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>チェックマークアイコン</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h2 className="mt-6 font-bold text-3xl text-gray-900">
						管理画面ログイン
					</h2>
					<p className="mt-2 text-gray-600 text-sm">
						Fast EC 管理システムにアクセス
					</p>
				</div>

				{/* ログインフォーム */}
				<div className="rounded-lg bg-white px-6 py-8 shadow-lg sm:px-10">
					<div className="space-y-6">
						{/* エラーメッセージ */}
						{error && (
							<div className="rounded-md border border-red-200 bg-red-50 p-4">
								<div className="flex">
									<div className="flex-shrink-0">
										<svg
											className="h-5 w-5 text-red-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<title>エラーアイコン</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<div className="ml-3">
										<p className="text-red-800 text-sm">{error}</p>
									</div>
								</div>
							</div>
						)}

						{/* Discordログインボタン */}
						<div>
							<button
								type="button"
								onClick={() => handleSignIn("discord")}
								disabled={isLoading}
								className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 font-medium text-sm text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{isLoading ? (
									<svg
										className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<title>読み込み中アイコン</title>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
								) : (
									<svg
										className="mr-2 h-5 w-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<title>Discordアイコン</title>
										<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
									</svg>
								)}
								Discordでログイン
							</button>
						</div>

						{/* 将来的な拡張用の区切り線 */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-gray-300 border-t" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-white px-2 text-gray-500">または</span>
							</div>
						</div>

						{/* 将来的な追加認証プロバイダー用スペース */}
						<div className="text-center">
							<p className="text-gray-600 text-sm">
								他の認証方法は今後追加予定です
							</p>
						</div>
					</div>
				</div>

				{/* フッター */}
				<div className="text-center">
					<p className="text-gray-600 text-sm">
						<Link
							href="/"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							メインサイトに戻る
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
