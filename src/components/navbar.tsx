import { Link } from "@tanstack/react-router";
import { NotificationsMenu } from "@/components/notifications-menu";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { UserAvatar } from "@/components/user-avatar";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function Navbar() {
	const { isAuthenticated, login } = useAuth();

	const navItems = [
		{ label: "About", to: "/about" },
		{ label: "Contact", to: "/contact" },
	];

	const handleLogin = () => {
		login(window.location.href);
	};

	return (
		<nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				{/* Logo/Brand e Navigation a sinistra */}
				<div className="flex items-center gap-6">
					<Link
						to="/"
						className="group flex items-center space-x-2 transition-all hover:scale-105"
					>
						<span className="bg-linear-to-r from-primary via-primary to-primary/80 bg-clip-text text-2xl font-bold tracking-tight text-transparent transition-all group-hover:from-primary group-hover:via-primary group-hover:to-primary/60">
							BIBS
						</span>
					</Link>

					{/* Navigation */}
					<NavigationMenu>
						<NavigationMenuList className="gap-1">
							{navItems.map((item) => (
								<NavigationMenuItem key={item.to}>
									<Link
										to={item.to}
										className={cn(
											"group relative inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all",
											"hover:text-primary hover:bg-transparent",
											"focus:text-primary focus:bg-transparent",
											"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
											"disabled:pointer-events-none disabled:opacity-50",
											// Active state migliorato usando data-[status='active'] di TanStack Router
											"data-[status='active']:text-primary data-[status='active']:font-semibold",
											"data-[status='active']:bg-transparent",
											// Indicatore visivo migliorato per la route attiva - linea allineata al bordo inferiore della navbar
											"data-[status='active']:after:absolute data-[status='active']:after:-bottom-[14px] data-[status='active']:after:left-1/2 data-[status='active']:after:h-1 data-[status='active']:after:w-10 data-[status='active']:after:-translate-x-1/2 data-[status='active']:after:rounded-full data-[status='active']:after:bg-primary data-[status='active']:after:shadow-lg",
										)}
									>
										{item.label}
									</Link>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				{/* Elementi a destra: Saldo Punti, Notifiche, Avatar/Login */}
				<div className="flex items-center gap-4">
					{isAuthenticated && (
						<>
							{/* Saldo Punti */}
							<div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50">
								<span className="text-sm font-medium text-foreground">
									Saldo Punti
								</span>
								<span className="text-sm font-semibold text-primary">0</span>
							</div>

							{/* Menu Notifiche */}
							<NotificationsMenu />
						</>
					)}

					{/* User Avatar o Login Button */}
					{isAuthenticated ? (
						<UserAvatar />
					) : (
						<Button onClick={handleLogin} variant="default">
							Login
						</Button>
					)}
				</div>
			</div>
		</nav>
	);
}
