import { CategorySection } from "~/components/ui/CategorySection";
import { Footer } from "~/components/ui/Footer";
import { Header } from "~/components/ui/Header";
import { HeroSection } from "~/components/ui/HeroSection";
import { HydrateClient, api } from "~/trpc/server";
import { HomeClient } from "./HomeClient";

/**
 * Homepage component for the e-commerce site
 *
 * Server Component that pre-fetches featured products data,
 * then delegates interactive functionality to client components.
 */
export default async function HomePage() {
	// Fetch featured products on server side for better performance
	await api.product.list.prefetch({
		status: "PUBLISHED",
		limit: 8,
	});

	// Mock user session data - in real app, this would come from auth
	const mockSession = {
		isAuthenticated: false,
		userName: null,
		cartItemCount: 0,
	};

	return (
		<div className="min-h-screen bg-white">
			<Header
				cartItemCount={mockSession.cartItemCount}
				isAuthenticated={mockSession.isAuthenticated}
				userName={mockSession.userName}
			/>

			<main>
				<HeroSection />
				<CategorySection />
				<HydrateClient>
					<HomeClient />
				</HydrateClient>
			</main>

			<Footer />
		</div>
	);
}
