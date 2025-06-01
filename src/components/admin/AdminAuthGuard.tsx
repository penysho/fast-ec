"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AdminAuthGuardProps {
	children: React.ReactNode;
}

/**
 * Admin authentication guard component
 *
 * Provides centralized authentication checking for admin pages.
 * Redirects unauthenticated users to the login page and shows loading state
 * while checking authentication status.
 *
 * @param children - Child components to render when authenticated
 * @returns Protected admin content or loading/redirect states
 */
export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "loading") return;

		if (!session) {
			router.push("/admin/login");
		}
	}, [session, status, router]);

	if (status === "loading") {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="mx-auto h-12 w-12 animate-spin rounded-full border-indigo-600 border-b-2" />
					<p className="mt-4 text-gray-600">読み込み中...</p>
				</div>
			</div>
		);
	}

	if (!session) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="mx-auto h-12 w-12 animate-spin rounded-full border-indigo-600 border-b-2" />
					<p className="mt-4 text-gray-600">
						ログインページにリダイレクト中...
					</p>
				</div>
			</div>
		);
	}

	return <>{children}</>;
}
