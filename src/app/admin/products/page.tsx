import type { Metadata } from "next";
import { ProductsClient } from "./ProductsClient";

export const metadata: Metadata = {
	title: "商品管理 - Fast EC",
	description: "商品の追加、編集、削除を行う管理画面",
};

export default function AdminProductsPage() {
	return <ProductsClient />;
}
