import type { Metadata } from "next";
import { NewProductClient } from "./NewProductClient";

export const metadata: Metadata = {
	title: "新商品追加 - Fast EC",
	description: "新しい商品を登録する管理画面",
};

export default function NewProductPage() {
	return <NewProductClient />;
}
