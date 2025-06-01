import type { Metadata } from "next";
import { EditProductClient } from "./EditProductClient";

interface EditProductPageProps {
	params: {
		id: string;
	};
}

export async function generateMetadata({
	params,
}: EditProductPageProps): Promise<Metadata> {
	return {
		title: "商品編集 - Fast EC",
		description: `商品ID: ${params.id} の商品を編集する管理画面`,
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
export default function EditProductPage({ params }: EditProductPageProps) {
	return <EditProductClient productId={params.id} />;
}
