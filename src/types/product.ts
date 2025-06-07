import { z } from "zod";

// 商品ステータス
export const ProductStatus = {
	DRAFT: "draft",
	PUBLISHED: "published",
} as const;

export type ProductStatusType =
	(typeof ProductStatus)[keyof typeof ProductStatus];

// 商品カテゴリー
export const ProductCategories = [
	"衣類",
	"靴",
	"アクセサリー",
	"電子機器",
	"本",
	"スポーツ",
	"その他",
] as const;

export type ProductCategory = (typeof ProductCategories)[number];

// Zodスキーマ定義
export const productSchema = z.object({
	name: z
		.string()
		.min(1, "商品名は必須です")
		.max(100, "商品名は100文字以内で入力してください"),
	description: z
		.string()
		.min(1, "商品説明は必須です")
		.max(1000, "商品説明は1000文字以内で入力してください"),
	category: z.string().min(1, "カテゴリーを選択してください"),
	price: z
		.string()
		.min(1, "価格は必須です")
		.refine(
			(val) => !Number.isNaN(Number(val)) && Number(val) > 0,
			"正しい価格を入力してください",
		),
	stock: z
		.string()
		.min(1, "在庫数は必須です")
		.refine(
			(val) => !Number.isNaN(Number(val)) && Number(val) >= 0,
			"正しい在庫数を入力してください",
		),
	status: z.enum(["draft", "published"], {
		required_error: "ステータスを選択してください",
	}),
	tags: z.string().optional(),
	metaTitle: z
		.string()
		.max(60, "メタタイトルは60文字以内で入力してください")
		.optional(),
	metaDescription: z
		.string()
		.max(160, "メタディスクリプションは160文字以内で入力してください")
		.optional(),
	images: z.array(z.instanceof(File)).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

// API用の商品データ型（実際のAPIレスポンスに合わせて更新）
export interface Product {
	id: string;
	name: string;
	description: string;
	slug: string;
	price: number;
	stock: number;
	status: string;
	tags: string[];
	metaTitle: string | null;
	metaDescription: string | null;
	categoryId: string;
	createdById: string;
	createdAt: Date;
	updatedAt: Date;
	category: {
		name: string;
		slug: string;
	};
	images: {
		id: string;
		url: string;
		alt: string | null;
		order: number;
	}[];
	createdBy: {
		name: string | null;
		email: string | null;
	};
}

// 商品作成用のリクエスト型
export interface CreateProductRequest {
	name: string;
	description: string;
	category: string;
	price: number;
	stock: number;
	status: ProductStatusType;
	tags?: string[];
	metaTitle?: string;
	metaDescription?: string;
	images?: File[];
}
