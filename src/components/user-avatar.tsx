import { Link, useRouter } from "@tanstack/react-router";
import { HelpCircle, LogOut, Monitor, Moon, Sun, User } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UserInfo } from "@/lib/auth";
import { useAuth } from "@/lib/auth";

function getInitials(userInfo?: UserInfo): string {
	if (userInfo?.given_name && userInfo?.family_name) {
		return `${userInfo.given_name[0]}${userInfo.family_name[0]}`.toUpperCase();
	}
	if (userInfo?.name) {
		const names = userInfo.name.split(" ");
		if (names.length >= 2) {
			return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
		}
		return userInfo.name[0].toUpperCase();
	}
	if (userInfo?.preferred_username) {
		return userInfo.preferred_username[0].toUpperCase();
	}
	if (userInfo?.email) {
		return userInfo.email[0].toUpperCase();
	}
	return "U";
}

function getDisplayName(userInfo?: UserInfo): string {
	if (userInfo?.name) return userInfo.name;
	if (userInfo?.given_name && userInfo?.family_name) {
		return `${userInfo.given_name} ${userInfo.family_name}`;
	}
	if (userInfo?.preferred_username) return userInfo.preferred_username;
	if (userInfo?.email) return userInfo.email;
	return "User";
}

export function UserAvatar() {
	const { userInfo, logout } = useAuth();
	const { theme, setTheme } = useTheme();
	const router = useRouter();

	const handleLogout = () => {
		logout().then(() => {
			router.invalidate().finally(() => {
				router.navigate({ to: "/" });
			});
		});
	};

	if (!userInfo) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="relative flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
				>
					<Avatar size="default">
						<AvatarFallback className="bg-primary text-primary-foreground">
							{getInitials(userInfo)}
						</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-80">
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							{getDisplayName(userInfo)}
						</p>
						{userInfo.email && (
							<p className="text-xs leading-none text-primary/80">
								{userInfo.email}
							</p>
						)}
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<div className="px-2 py-1.5">
					<div className="flex items-center rounded-md bg-muted-foreground/10 p-1">
						<button
							type="button"
							onClick={() => setTheme("light")}
							title="Tema chiaro"
							className={`flex flex-1 items-center justify-center rounded-sm p-1.5 transition-colors ${
								theme === "light"
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<Sun className="size-4" />
						</button>
						<button
							type="button"
							onClick={() => setTheme("dark")}
							title="Tema scuro"
							className={`flex flex-1 items-center justify-center rounded-sm p-1.5 transition-colors ${
								theme === "dark"
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<Moon className="size-4" />
						</button>
						<button
							type="button"
							onClick={() => setTheme("system")}
							title="Tema di sistema"
							className={`flex flex-1 items-center justify-center rounded-sm p-1.5 transition-colors ${
								theme === "system"
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<Monitor className="size-4" />
						</button>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link to="/profile" className="cursor-pointer">
						<User className="mr-2 size-4" />
						<span>Profilo</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link to="/help" className="cursor-pointer">
						<HelpCircle className="mr-2 size-4" />
						<span>Aiuto</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleLogout}
					variant="destructive"
					className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 hover:bg-destructive/10 hover:text-destructive"
				>
					<LogOut className="mr-2 size-4 text-destructive" />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
