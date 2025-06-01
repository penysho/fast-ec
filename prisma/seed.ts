import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Seed the database with initial data for the e-commerce application
 */
async function main() {
	console.log("Starting database seeding...");

	// Create categories
	console.log("Creating categories...");
	const categories = [
		{
			name: "衣類",
			slug: "clothing",
			description: "衣類・ファッションアイテム",
		},
		{
			name: "靴",
			slug: "shoes",
			description: "スニーカー、ブーツ、サンダルなど",
		},
		{
			name: "アクセサリー",
			slug: "accessories",
			description: "バッグ、時計、ジュエリーなど",
		},
		{
			name: "電子機器",
			slug: "electronics",
			description: "スマートフォン、パソコン、家電製品",
		},
		{
			name: "本・雑誌",
			slug: "books",
			description: "書籍、雑誌、電子書籍",
		},
		{
			name: "スポーツ",
			slug: "sports",
			description: "スポーツ用品、フィットネス機器",
		},
		{
			name: "その他",
			slug: "others",
			description: "その他のアイテム",
		},
	];

	for (const category of categories) {
		await prisma.category.upsert({
			where: { slug: category.slug },
			update: {},
			create: category,
		});
	}

	// Create admin user
	console.log("Creating admin user...");
	const adminUser = await prisma.user.upsert({
		where: { email: "admin@example.com" },
		update: {},
		create: {
			name: "Administrator",
			email: "admin@example.com",
			role: "ADMIN",
			phone: "03-1234-5678",
			address: "東京都渋谷区",
			city: "渋谷区",
			state: "東京都",
			zipCode: "150-0001",
			country: "Japan",
		},
	});

	// Create super admin user
	console.log("Creating super admin user...");
	const superAdminUser = await prisma.user.upsert({
		where: { email: "superadmin@example.com" },
		update: {},
		create: {
			name: "Super Administrator",
			email: "superadmin@example.com",
			role: "SUPER_ADMIN",
			phone: "03-9876-5432",
			address: "東京都新宿区",
			city: "新宿区",
			state: "東京都",
			zipCode: "160-0001",
			country: "Japan",
		},
	});

	// Create sample products
	console.log("Creating sample products...");
	const clothingCategory = await prisma.category.findUnique({
		where: { slug: "clothing" },
	});
	const shoesCategory = await prisma.category.findUnique({
		where: { slug: "shoes" },
	});
	const accessoriesCategory = await prisma.category.findUnique({
		where: { slug: "accessories" },
	});

	if (clothingCategory && shoesCategory && accessoriesCategory) {
		const sampleProducts = [
			{
				name: "プレミアムTシャツ",
				slug: "premium-tshirt",
				description:
					"高品質なコットン100%のプレミアムTシャツです。肌触りが良く、着心地抜群です。",
				price: 2980, // ¥29.80 in cents
				stock: 45,
				status: "PUBLISHED" as const,
				tags: ["カジュアル", "夏物", "コットン"],
				metaTitle: "プレミアムTシャツ - 高品質コットン100%",
				metaDescription:
					"肌触りの良いコットン100%のプレミアムTシャツ。着心地抜群で普段使いに最適です。",
				categoryId: clothingCategory.id,
				createdById: adminUser.id,
			},
			{
				name: "デニムジャケット",
				slug: "denim-jacket",
				description:
					"クラシックなデザインのデニムジャケット。どんなスタイルにも合わせやすい定番アイテムです。",
				price: 8980, // ¥89.80 in cents
				stock: 12,
				status: "PUBLISHED" as const,
				tags: ["デニム", "アウター", "クラシック"],
				metaTitle: "デニムジャケット - クラシックデザイン",
				metaDescription:
					"どんなスタイルにも合わせやすいクラシックなデニムジャケット。定番アイテムです。",
				categoryId: clothingCategory.id,
				createdById: adminUser.id,
			},
			{
				name: "スニーカー",
				slug: "sneakers",
				description: "快適な履き心地のスニーカー。毎日の通勤や散歩に最適です。",
				price: 12800, // ¥128.00 in cents
				stock: 8,
				status: "DRAFT" as const,
				tags: ["スニーカー", "快適", "通勤"],
				metaTitle: "スニーカー - 快適な履き心地",
				metaDescription:
					"毎日の通勤や散歩に最適な快適な履き心地のスニーカーです。",
				categoryId: shoesCategory.id,
				createdById: adminUser.id,
			},
			{
				name: "レザーバッグ",
				slug: "leather-bag",
				description:
					"上質なレザーを使用したエレガントなバッグ。ビジネスシーンにも普段使いにも最適です。",
				price: 24800, // ¥248.00 in cents
				stock: 0,
				status: "PUBLISHED" as const,
				tags: ["レザー", "バッグ", "ビジネス", "エレガント"],
				metaTitle: "レザーバッグ - 上質なレザー使用",
				metaDescription:
					"ビジネスシーンから普段使いまで、上質なレザーを使用したエレガントなバッグです。",
				categoryId: accessoriesCategory.id,
				createdById: adminUser.id,
			},
			{
				name: "腕時計",
				slug: "wristwatch",
				description:
					"シンプルで洗練されたデザインの腕時計。どんな服装にも合わせやすいです。",
				price: 45000, // ¥450.00 in cents
				stock: 23,
				status: "PUBLISHED" as const,
				tags: ["時計", "シンプル", "洗練"],
				metaTitle: "腕時計 - シンプルで洗練されたデザイン",
				metaDescription:
					"どんな服装にも合わせやすい、シンプルで洗練されたデザインの腕時計です。",
				categoryId: accessoriesCategory.id,
				createdById: adminUser.id,
			},
		];

		for (const product of sampleProducts) {
			await prisma.product.upsert({
				where: { slug: product.slug },
				update: {},
				create: product,
			});
		}
	}

	// Create sample customer user
	console.log("Creating sample customer...");
	const customerUser = await prisma.user.upsert({
		where: { email: "customer@example.com" },
		update: {},
		create: {
			name: "田中太郎",
			email: "customer@example.com",
			role: "CUSTOMER",
			phone: "090-1234-5678",
			address: "大阪府大阪市北区梅田1-1-1",
			city: "大阪市北区",
			state: "大阪府",
			zipCode: "530-0001",
			country: "Japan",
		},
	});

	// Create cart for sample customer
	console.log("Creating sample cart...");
	await prisma.cart.upsert({
		where: { userId: customerUser.id },
		update: {},
		create: {
			userId: customerUser.id,
		},
	});

	console.log("Database seeding completed successfully!");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error("Error during seeding:", e);
		await prisma.$disconnect();
		process.exit(1);
	});
