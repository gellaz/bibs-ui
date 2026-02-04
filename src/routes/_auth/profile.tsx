import { createFileRoute } from "@tanstack/react-router";
import {
	AtSign,
	Calendar,
	CheckCircle2,
	Copy,
	Fingerprint,
	Mail,
	Shield,
	Sparkles,
	User,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { UserInfo } from "@/lib/auth";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_auth/profile")({
	component: ProfilePage,
});

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
	return "Utente";
}

function InfoRow({
	icon: Icon,
	label,
	value,
	mono = false,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
	mono?: boolean;
}) {
	return (
		<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
			<div className="flex items-center justify-center size-9 rounded-full bg-primary/10 text-primary shrink-0">
				<Icon className="size-4" />
			</div>
			<div className="flex-1 min-w-0">
				<p className="text-xs text-muted-foreground">{label}</p>
				<p
					className={`text-sm font-medium truncate ${mono ? "font-mono text-xs" : ""}`}
				>
					{value}
				</p>
			</div>
		</div>
	);
}

function ProfilePage() {
	const { userInfo } = useAuth();
	const [copied, setCopied] = useState(false);

	const copyUserId = () => {
		if (userInfo?.sub) {
			navigator.clipboard.writeText(userInfo.sub);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	if (!userInfo) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<Card className="w-full max-w-md border-dashed">
					<CardContent className="flex flex-col items-center py-12">
						<div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
							<User className="size-8 text-muted-foreground" />
						</div>
						<p className="text-muted-foreground text-center">
							Nessun dato utente disponibile.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-muted/30 to-background">
			<div className="mx-auto max-w-3xl px-4 py-12">
				{/* Hero Header */}
				<div className="relative mb-10">
					{/* Decorative background */}
					<div className="absolute inset-0 -top-8 bg-linear-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-2xl" />

					<Card className="relative overflow-hidden border-0 shadow-xl bg-card/80 backdrop-blur">
						<div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-primary/10 to-transparent rounded-full -translate-y-32 translate-x-32" />
						<CardContent className="pt-8 pb-8">
							<div className="flex flex-col items-center text-center space-y-4">
								{/* Avatar with ring */}
								<div className="relative">
									<div className="absolute inset-0 bg-linear-to-r from-primary to-primary/60 rounded-full blur-md opacity-50 scale-110" />
									<Avatar className="relative size-28 ring-4 ring-background shadow-xl">
										<AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-primary-foreground text-4xl font-semibold">
											{getInitials(userInfo)}
										</AvatarFallback>
									</Avatar>
									{/* Online indicator */}
									<div className="absolute bottom-1 right-1 size-5 bg-green-500 rounded-full ring-4 ring-background" />
								</div>

								{/* Name and status */}
								<div className="space-y-2">
									<h1 className="text-3xl font-bold tracking-tight">
										{getDisplayName(userInfo)}
									</h1>
									<div className="flex items-center justify-center gap-2 text-muted-foreground">
										<CheckCircle2 className="size-4 text-green-500" />
										<span className="text-sm">Account verificato</span>
									</div>
								</div>

								{/* Quick info badges */}
								<div className="flex flex-wrap items-center justify-center gap-2 pt-2">
									{userInfo.email && (
										<Badge
											variant="outline"
											className="gap-1.5 py-1.5 px-3 bg-background/50"
										>
											<Mail className="size-3" />
											{userInfo.email}
										</Badge>
									)}
									{userInfo.preferred_username && (
										<Badge
											variant="outline"
											className="gap-1.5 py-1.5 px-3 bg-background/50"
										>
											<AtSign className="size-3" />
											{userInfo.preferred_username}
										</Badge>
									)}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Stats Row */}
				<div className="grid grid-cols-3 gap-4 mb-8">
					<Card className="text-center py-4 hover:shadow-md transition-shadow">
						<CardContent className="p-0">
							<div className="text-2xl font-bold text-primary">
								{userInfo.roles.length}
							</div>
							<p className="text-xs text-muted-foreground mt-1">Ruoli</p>
						</CardContent>
					</Card>
					<Card className="text-center py-4 hover:shadow-md transition-shadow">
						<CardContent className="p-0">
							<div className="text-2xl font-bold text-green-500">Attivo</div>
							<p className="text-xs text-muted-foreground mt-1">Stato</p>
						</CardContent>
					</Card>
					<Card className="text-center py-4 hover:shadow-md transition-shadow">
						<CardContent className="p-0">
							<div className="text-2xl font-bold text-primary">
								<Sparkles className="size-6 mx-auto" />
							</div>
							<p className="text-xs text-muted-foreground mt-1">Premium</p>
						</CardContent>
					</Card>
				</div>

				<Separator className="my-8" />

				{/* Details Section */}
				<div className="space-y-6">
					{/* Personal Info */}
					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader className="pb-4">
							<div className="flex items-center gap-3">
								<div className="size-10 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
									<User className="size-5" />
								</div>
								<div>
									<CardTitle className="text-lg">
										Informazioni Personali
									</CardTitle>
									<CardDescription>I tuoi dati personali</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="grid gap-3 sm:grid-cols-2">
							{userInfo.given_name && (
								<InfoRow icon={User} label="Nome" value={userInfo.given_name} />
							)}
							{userInfo.family_name && (
								<InfoRow
									icon={User}
									label="Cognome"
									value={userInfo.family_name}
								/>
							)}
							{userInfo.email && (
								<InfoRow icon={Mail} label="Email" value={userInfo.email} />
							)}
							{userInfo.preferred_username && (
								<InfoRow
									icon={AtSign}
									label="Username"
									value={userInfo.preferred_username}
								/>
							)}
						</CardContent>
					</Card>

					{/* Account Info */}
					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader className="pb-4">
							<div className="flex items-center gap-3">
								<div className="size-10 rounded-xl bg-linear-to-br from-violet-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/25">
									<Fingerprint className="size-5" />
								</div>
								<div>
									<CardTitle className="text-lg">Dettagli Account</CardTitle>
									<CardDescription>
										Informazioni tecniche del tuo account
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							{userInfo.sub && (
								<div className="p-4 rounded-xl bg-muted/50 border border-border/50">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm text-muted-foreground flex items-center gap-2">
											<Fingerprint className="size-4" />
											User ID
										</span>
										<Button
											variant="ghost"
											size="sm"
											onClick={copyUserId}
											className="h-8 gap-2"
										>
											{copied ? (
												<>
													<CheckCircle2 className="size-3.5 text-green-500" />
													<span className="text-xs">Copiato!</span>
												</>
											) : (
												<>
													<Copy className="size-3.5" />
													<span className="text-xs">Copia</span>
												</>
											)}
										</Button>
									</div>
									<code className="block text-xs font-mono text-foreground/80 bg-background px-3 py-2 rounded-lg break-all border">
										{userInfo.sub}
									</code>
								</div>
							)}
							<div className="grid gap-3 sm:grid-cols-2">
								<InfoRow
									icon={Calendar}
									label="Membro dal"
									value={new Date().toLocaleDateString("it-IT", {
										year: "numeric",
										month: "long",
									})}
								/>
								<InfoRow
									icon={CheckCircle2}
									label="Stato account"
									value="Verificato"
								/>
							</div>
						</CardContent>
					</Card>

					{/* Roles */}
					{userInfo.roles.length > 0 && (
						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader className="pb-4">
								<div className="flex items-center gap-3">
									<div className="size-10 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/25">
										<Shield className="size-5" />
									</div>
									<div>
										<CardTitle className="text-lg">Ruoli e Permessi</CardTitle>
										<CardDescription>
											I ruoli assegnati al tuo account
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									{userInfo.roles.map((role) => (
										<Badge
											key={role}
											variant="secondary"
											className="py-2 px-4 text-sm bg-linear-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-colors border-primary/20"
										>
											<Shield className="size-3.5 mr-1.5" />
											{role}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
