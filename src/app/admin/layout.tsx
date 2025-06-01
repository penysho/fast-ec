import { AdminClientLayout } from "@/components/admin/AdminClientLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "管理画面 - Fast EC",
	description: "EC管理画面",
};

interface AdminLayoutProps {
	children: React.ReactNode;
}

/**
 * Admin layout server component
 *
 * Provides the server-side layout structure for admin pages.
 * Handles metadata and wraps children with client-side functionality.
 *
 * @param children - Page content to render within the layout
 * @returns Server-side admin layout with metadata
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
	return <AdminClientLayout>{children}</AdminClientLayout>;
}
