import type { Metadata } from "next";
import { EditProductClient } from "./EditProductClient";

interface EditProductPageProps {
	params: Promise<{
		id: string;
	}>;
}

export async function generateMetadata({
	params,
}: EditProductPageProps): Promise<Metadata> {
	const { id } = await params;
	return {
		title: "商品編集 - Fast EC",
		description: `商品ID: ${id} の商品を編集する管理画面`,
	};
}

/**
 * Product edit page
 *
 * Server component that handles product editing functionality.
 * Extracts product ID from URL parameters and passes to client component.
 *
 * @param params - URL parameters containing product ID
 * @returns Product edit page with client-side interactivity
 */
export default async function EditProductPage({
	params,
}: EditProductPageProps) {
	const { id } = await params;
	return <EditProductClient productId={id} />;
}
