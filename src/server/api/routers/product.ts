import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

/**
 * Utility function to generate URL-safe slug from string
 */
function generateSlug(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/**
 * Product creation input schema matching frontend form
 */
const createProductSchema = z.object({
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
	// For now, we'll handle images separately after product creation
	imageUrls: z.array(z.string()).optional(),
});

/**
 * Product update input schema
 */
const updateProductSchema = createProductSchema.extend({
	id: z.string().min(1, "商品IDは必須です"),
});

/**
 * Product listing filters
 */
const productListFiltersSchema = z.object({
	category: z.string().optional(),
	status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
	search: z.string().optional(),
	limit: z.number().min(1).max(100).default(10),
	cursor: z.string().optional(),
});

/**
 * Product image schemas
 */
const addProductImageSchema = z.object({
	productId: z.string().min(1, "商品IDは必須です"),
	url: z.string().url("有効なURLを入力してください"),
	alt: z.string().optional(),
	order: z.number().default(0),
});

const updateProductImageSchema = z.object({
	id: z.string().min(1, "画像IDは必須です"),
	url: z.string().url("有効なURLを入力してください").optional(),
	alt: z.string().optional(),
	order: z.number().optional(),
});

const deleteProductImageSchema = z.object({
	id: z.string().min(1, "画像IDは必須です"),
});

export const productRouter = createTRPCRouter({
	/**
	 * Get all products with filtering and pagination
	 */
	list: publicProcedure
		.input(productListFiltersSchema)
		.query(async ({ ctx, input }) => {
			const { category, status, search, limit, cursor } = input;

			// Build where condition
			const where: Prisma.ProductWhereInput = {};

			if (category) {
				const categoryRecord = await ctx.db.category.findUnique({
					where: { slug: category },
				});
				if (categoryRecord) {
					where.categoryId = categoryRecord.id;
				}
			}

			if (status) {
				where.status = status;
			}

			if (search) {
				where.OR = [
					{ name: { contains: search, mode: "insensitive" } },
					{ description: { contains: search, mode: "insensitive" } },
					{ tags: { has: search } },
				];
			}

			const products = await ctx.db.product.findMany({
				where,
				take: limit + 1,
				cursor: cursor ? { id: cursor } : undefined,
				orderBy: { createdAt: "desc" },
				include: {
					category: {
						select: {
							name: true,
							slug: true,
						},
					},
					images: {
						orderBy: { order: "asc" },
						select: {
							id: true,
							url: true,
							alt: true,
							order: true,
						},
					},
					createdBy: {
						select: {
							name: true,
							email: true,
						},
					},
				},
			});

			let nextCursor: typeof cursor | undefined = undefined;
			if (products.length > limit) {
				const nextItem = products.pop();
				nextCursor = nextItem?.id;
			}

			return {
				products,
				nextCursor,
			};
		}),

	/**
	 * Get product by ID
	 */
	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const product = await ctx.db.product.findUnique({
				where: { id: input.id },
				include: {
					category: true,
					images: {
						orderBy: { order: "asc" },
					},
					createdBy: {
						select: {
							name: true,
							email: true,
						},
					},
				},
			});

			if (!product) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "商品が見つかりません",
				});
			}

			return product;
		}),

	/**
	 * Get product by slug
	 */
	getBySlug: publicProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ ctx, input }) => {
			const product = await ctx.db.product.findUnique({
				where: { slug: input.slug },
				include: {
					category: true,
					images: {
						orderBy: { order: "asc" },
					},
					createdBy: {
						select: {
							name: true,
							email: true,
						},
					},
				},
			});

			if (!product) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "商品が見つかりません",
				});
			}

			return product;
		}),

	/**
	 * Create new product (Admin only)
	 */
	create: protectedProcedure
		.input(createProductSchema)
		.mutation(async ({ ctx, input }) => {
			// TODO: Uncomment when authentication is properly configured
			// Check if user is admin
			// if (ctx.session.user.role !== "ADMIN" && ctx.session.user.role !== "SUPER_ADMIN") {
			// 	throw new TRPCError({
			// 		code: "FORBIDDEN",
			// 		message: "管理者権限が必要です",
			// 	});
			// }

			// Find category by name
			const category = await ctx.db.category.findFirst({
				where: { name: input.category },
			});

			if (!category) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "指定されたカテゴリーが見つかりません",
				});
			}

			// Generate unique slug
			const baseSlug = generateSlug(input.name);
			let slug = baseSlug;
			let counter = 1;

			while (await ctx.db.product.findUnique({ where: { slug } })) {
				slug = `${baseSlug}-${counter}`;
				counter++;
			}

			// Parse tags
			const tags = input.tags
				? input.tags
						.split(",")
						.map((tag) => tag.trim())
						.filter((tag) => tag.length > 0)
				: [];

			// Convert price and stock from string to number
			const price = Math.round(Number(input.price) * 100); // Convert to cents
			const stock = Number(input.stock);

			// Map status
			const status = input.status === "published" ? "PUBLISHED" : "DRAFT";

			const product = await ctx.db.product.create({
				data: {
					name: input.name,
					description: input.description,
					slug,
					price,
					stock,
					status,
					tags,
					metaTitle: input.metaTitle || null,
					metaDescription: input.metaDescription || null,
					categoryId: category.id,
					createdById: ctx.session.user.id,
				},
				include: {
					category: true,
					images: {
						orderBy: { order: "asc" },
					},
				},
			});

			// Add images if provided
			if (input.imageUrls && input.imageUrls.length > 0) {
				const imageData = input.imageUrls.map((url, index) => ({
					url,
					alt: input.name,
					order: index,
					productId: product.id,
				}));

				await ctx.db.productImage.createMany({
					data: imageData,
				});

				// Refetch product with images
				return await ctx.db.product.findUnique({
					where: { id: product.id },
					include: {
						category: true,
						images: {
							orderBy: { order: "asc" },
						},
					},
				});
			}

			return product;
		}),

	/**
	 * Update existing product (Admin only)
	 */
	update: protectedProcedure
		.input(updateProductSchema)
		.mutation(async ({ ctx, input }) => {
			// TODO: Uncomment when authentication is properly configured
			// Check if user is admin
			// if (ctx.session.user.role !== "ADMIN" && ctx.session.user.role !== "SUPER_ADMIN") {
			// 	throw new TRPCError({
			// 		code: "FORBIDDEN",
			// 		message: "管理者権限が必要です",
			// 	});
			// }

			// Check if product exists
			const existingProduct = await ctx.db.product.findUnique({
				where: { id: input.id },
			});

			if (!existingProduct) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "商品が見つかりません",
				});
			}

			// Find category by name
			const category = await ctx.db.category.findFirst({
				where: { name: input.category },
			});

			if (!category) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "指定されたカテゴリーが見つかりません",
				});
			}

			// Generate unique slug if name changed
			let slug = existingProduct.slug;
			if (input.name !== existingProduct.name) {
				const baseSlug = generateSlug(input.name);
				slug = baseSlug;
				let counter = 1;

				while (
					await ctx.db.product.findFirst({
						where: { slug, id: { not: input.id } },
					})
				) {
					slug = `${baseSlug}-${counter}`;
					counter++;
				}
			}

			// Parse tags
			const tags = input.tags
				? input.tags
						.split(",")
						.map((tag) => tag.trim())
						.filter((tag) => tag.length > 0)
				: [];

			// Convert price and stock from string to number
			const price = Math.round(Number(input.price));
			const stock = Number(input.stock);

			// Map status
			const status = input.status === "published" ? "PUBLISHED" : "DRAFT";

			const product = await ctx.db.product.update({
				where: { id: input.id },
				data: {
					name: input.name,
					description: input.description,
					slug,
					price,
					stock,
					status,
					tags,
					metaTitle: input.metaTitle || null,
					metaDescription: input.metaDescription || null,
					categoryId: category.id,
				},
				include: {
					category: true,
					images: {
						orderBy: { order: "asc" },
					},
				},
			});

			return product;
		}),

	/**
	 * Delete product (Admin only)
	 */
	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			// TODO: Uncomment when authentication is properly configured
			// Check if user is admin
			// if (ctx.session.user.role !== "ADMIN" && ctx.session.user.role !== "SUPER_ADMIN") {
			// 	throw new TRPCError({
			// 		code: "FORBIDDEN",
			// 		message: "管理者権限が必要です",
			// 	});
			// }

			// Check if product exists
			const existingProduct = await ctx.db.product.findUnique({
				where: { id: input.id },
			});

			if (!existingProduct) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "商品が見つかりません",
				});
			}

			// Delete product (images will be cascade deleted)
			await ctx.db.product.delete({
				where: { id: input.id },
			});

			return { success: true };
		}),

	/**
	 * Get all categories for product form
	 */
	getCategories: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.category.findMany({
			orderBy: { name: "asc" },
			select: {
				id: true,
				name: true,
				slug: true,
				description: true,
			},
		});
	}),

	/**
	 * Get admin products list (with more detailed information)
	 */
	adminList: protectedProcedure
		.input(productListFiltersSchema)
		.query(async ({ ctx, input }) => {
			// TODO: Uncomment when authentication is properly configured
			// Check if user is admin
			// if (ctx.session.user.role !== "ADMIN" && ctx.session.user.role !== "SUPER_ADMIN") {
			// 	throw new TRPCError({
			// 		code: "FORBIDDEN",
			// 		message: "管理者権限が必要です",
			// 	});
			// }

			const { category, status, search, limit, cursor } = input;

			// Build where condition
			const where: Prisma.ProductWhereInput = {};

			if (category) {
				const categoryRecord = await ctx.db.category.findUnique({
					where: { slug: category },
				});
				if (categoryRecord) {
					where.categoryId = categoryRecord.id;
				}
			}

			if (status) {
				where.status = status;
			}

			if (search) {
				where.OR = [
					{ name: { contains: search, mode: "insensitive" } },
					{ description: { contains: search, mode: "insensitive" } },
					{ tags: { has: search } },
				];
			}

			const products = await ctx.db.product.findMany({
				where,
				take: limit + 1,
				cursor: cursor ? { id: cursor } : undefined,
				orderBy: { createdAt: "desc" },
				include: {
					category: {
						select: {
							name: true,
							slug: true,
						},
					},
					images: {
						take: 1,
						orderBy: { order: "asc" },
						select: {
							url: true,
							alt: true,
						},
					},
					createdBy: {
						select: {
							name: true,
							email: true,
						},
					},
				},
			});

			let nextCursor: typeof cursor | undefined = undefined;
			if (products.length > limit) {
				const nextItem = products.pop();
				nextCursor = nextItem?.id;
			}

			return {
				products,
				nextCursor,
			};
		}),

	/**
	 * Product Image Management APIs
	 */

	/**
	 * Add image to product
	 */
	addImage: protectedProcedure
		.input(addProductImageSchema)
		.mutation(async ({ ctx, input }) => {
			// Check if product exists
			const product = await ctx.db.product.findUnique({
				where: { id: input.productId },
			});

			if (!product) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "商品が見つかりません",
				});
			}

			const image = await ctx.db.productImage.create({
				data: {
					url: input.url,
					alt: input.alt || product.name,
					order: input.order,
					productId: input.productId,
				},
			});

			return image;
		}),

	/**
	 * Update product image
	 */
	updateImage: protectedProcedure
		.input(updateProductImageSchema)
		.mutation(async ({ ctx, input }) => {
			const existingImage = await ctx.db.productImage.findUnique({
				where: { id: input.id },
			});

			if (!existingImage) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "画像が見つかりません",
				});
			}

			const updateData: Partial<typeof input> = {};
			if (input.url) updateData.url = input.url;
			if (input.alt !== undefined) updateData.alt = input.alt;
			if (input.order !== undefined) updateData.order = input.order;

			const image = await ctx.db.productImage.update({
				where: { id: input.id },
				data: updateData,
			});

			return image;
		}),

	/**
	 * Delete product image
	 */
	deleteImage: protectedProcedure
		.input(deleteProductImageSchema)
		.mutation(async ({ ctx, input }) => {
			const existingImage = await ctx.db.productImage.findUnique({
				where: { id: input.id },
			});

			if (!existingImage) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "画像が見つかりません",
				});
			}

			await ctx.db.productImage.delete({
				where: { id: input.id },
			});

			return { success: true };
		}),
});
