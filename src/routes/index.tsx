import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	Award,
	Building2,
	Check,
	Coins,
	Gift,
	HandHeart,
	Heart,
	MapPin,
	ShoppingBag,
	Sparkles,
	Star,
	Store,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-primary/10 py-20 md:py-32">
				{/* Animated background elements */}
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-pulse" />
					<div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/15 blur-3xl animate-pulse delay-1000" />
					<div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl animate-pulse delay-500" />
				</div>

				<div className="container relative mx-auto px-4">
					<div className="flex flex-col items-center text-center">
						<Badge
							variant="secondary"
							className="mb-6 animate-fade-in-down px-4 py-1.5 text-sm"
						>
							<Sparkles className="mr-1.5 size-3.5" />
							La rivoluzione dello shopping locale
						</Badge>

						<h1 className="animate-fade-in-up mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							<span className="bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
								Buy In, Be Smart
							</span>
						</h1>

						<p className="animate-fade-in-up delay-150 mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
							Scopri i tesori nascosti della tua città.{" "}
							<span className="font-semibold text-foreground">
								Accumula punti
							</span>
							, supporta i{" "}
							<span className="font-semibold text-foreground">
								negozi locali
							</span>{" "}
							e fai la differenza nella tua comunità.
						</p>

						<div className="animate-fade-in-up delay-300 flex flex-col gap-4 sm:flex-row">
							<Button size="lg" className="group gap-2 text-base">
								Inizia ora
								<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
							</Button>
							<Button size="lg" variant="outline" className="gap-2 text-base">
								<Store className="size-4" />
								Sei un negozio?
							</Button>
						</div>

						{/* Stats preview */}
						<div className="animate-fade-in-up delay-500 mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
							{[
								{ value: "500+", label: "Negozi Partner", icon: Store },
								{ value: "15K+", label: "Utenti Attivi", icon: Users },
								{ value: "€250K", label: "Risparmi Generati", icon: Coins },
								{ value: "50+", label: "Città Coperte", icon: MapPin },
							].map((stat) => (
								<div key={stat.label} className="text-center">
									<div className="flex items-center justify-center gap-2">
										<stat.icon className="size-5 text-primary" />
										<span className="text-2xl font-bold sm:text-3xl">
											{stat.value}
										</span>
									</div>
									<p className="text-sm text-muted-foreground">{stat.label}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-20 md:py-28">
				<div className="container mx-auto px-4">
					<div className="mb-16 text-center">
						<Badge variant="outline" className="mb-4">
							Come funziona
						</Badge>
						<h2 className="mb-4 text-3xl font-bold sm:text-4xl">
							Semplice come <span className="text-primary">1, 2, 3</span>
						</h2>
						<p className="mx-auto max-w-2xl text-muted-foreground">
							BIBS rende lo shopping locale facile e gratificante. Ecco come
							puoi iniziare a fare la differenza oggi stesso.
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{[
							{
								step: "01",
								icon: MapPin,
								title: "Scopri",
								description:
									"Esplora i negozi locali nella tua zona. Trova gemme nascoste e attività uniche che meritano il tuo supporto.",
								color: "from-blue-500 to-cyan-500",
							},
							{
								step: "02",
								icon: ShoppingBag,
								title: "Acquista",
								description:
									"Fai acquisti nei negozi partner e accumula punti BIBS ad ogni transazione. Più compri locale, più guadagni!",
								color: "from-primary to-primary/70",
							},
							{
								step: "03",
								icon: Gift,
								title: "Guadagna",
								description:
									"Riscatta i tuoi punti per sconti esclusivi, premi speciali e esperienze uniche nei negozi della tua città.",
								color: "from-orange-500 to-amber-500",
							},
						].map((item) => (
							<Card
								key={item.step}
								className="group relative overflow-hidden border-0 bg-linear-to-br from-muted/50 to-muted/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
							>
								<div
									className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
								/>
								<CardHeader>
									<div className="mb-4 flex items-center justify-between">
										<div
											className={`flex size-14 items-center justify-center rounded-2xl bg-linear-to-br ${item.color} text-white shadow-lg`}
										>
											<item.icon className="size-7" />
										</div>
										<span className="text-5xl font-bold text-muted-foreground/20">
											{item.step}
										</span>
									</div>
									<CardTitle className="text-xl">{item.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-base">
										{item.description}
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Featured Shops */}
			<section className="bg-muted/30 py-20 md:py-28">
				<div className="container mx-auto px-4">
					<div className="mb-16 flex flex-col items-center justify-between gap-4 sm:flex-row">
						<div>
							<Badge variant="outline" className="mb-4">
								In evidenza
							</Badge>
							<h2 className="text-3xl font-bold sm:text-4xl">
								Negozi da scoprire
							</h2>
						</div>
						<Button variant="outline" className="gap-2">
							Vedi tutti <ArrowRight className="size-4" />
						</Button>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{[
							{
								name: "Bottega del Gusto",
								category: "Alimentari",
								rating: 4.9,
								points: "3x",
								image: "🧀",
								location: "Centro Storico",
							},
							{
								name: "Fioreria Rosa",
								category: "Fiori & Piante",
								rating: 4.8,
								points: "2x",
								image: "🌸",
								location: "Quartiere Prati",
							},
							{
								name: "Libreria Aurora",
								category: "Libri & Cultura",
								rating: 5.0,
								points: "2x",
								image: "📚",
								location: "Via Roma",
							},
							{
								name: "Pasticceria Dolce Vita",
								category: "Dolci & Caffè",
								rating: 4.9,
								points: "3x",
								image: "🎂",
								location: "Piazza Duomo",
							},
						].map((shop) => (
							<Card
								key={shop.name}
								className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
							>
								<div className="relative flex h-32 items-center justify-center bg-linear-to-br from-primary/10 to-primary/5">
									<span className="text-6xl transition-transform duration-300 group-hover:scale-110">
										{shop.image}
									</span>
									<Badge className="absolute right-3 top-3 bg-primary/90">
										{shop.points} Punti
									</Badge>
								</div>
								<CardHeader className="pb-2">
									<div className="flex items-start justify-between">
										<div>
											<CardTitle className="text-lg">{shop.name}</CardTitle>
											<CardDescription>{shop.category}</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent className="pt-0">
									<div className="flex items-center justify-between text-sm">
										<span className="flex items-center gap-1 text-muted-foreground">
											<MapPin className="size-3.5" />
											{shop.location}
										</span>
										<span className="flex items-center gap-1 font-medium text-amber-500">
											<Star className="size-3.5 fill-current" />
											{shop.rating}
										</span>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Points System */}
			<section className="py-20 md:py-28">
				<div className="container mx-auto px-4">
					<div className="grid items-center gap-12 lg:grid-cols-2">
						<div>
							<Badge variant="outline" className="mb-4">
								Sistema Punti
							</Badge>
							<h2 className="mb-6 text-3xl font-bold sm:text-4xl">
								Ogni acquisto vale <span className="text-primary">di più</span>
							</h2>
							<p className="mb-8 text-lg text-muted-foreground">
								Con BIBS, ogni euro speso nei negozi locali si trasforma in
								punti che puoi utilizzare per ottenere sconti, premi esclusivi e
								tanto altro.
							</p>

							<div className="space-y-4">
								{[
									{
										icon: Coins,
										title: "1€ = 10 Punti base",
										description:
											"Accumula punti automaticamente ad ogni acquisto",
									},
									{
										icon: Zap,
										title: "Moltiplicatori speciali",
										description: "Fino a 5x punti durante eventi e promozioni",
									},
									{
										icon: Award,
										title: "Livelli fedeltà",
										description:
											"Sblocca vantaggi esclusivi salendo di livello",
									},
									{
										icon: Gift,
										title: "Premi esclusivi",
										description:
											"Riscatta punti per sconti e esperienze uniche",
									},
								].map((feature) => (
									<div
										key={feature.title}
										className="flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-muted/50"
									>
										<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
											<feature.icon className="size-5" />
										</div>
										<div>
											<h3 className="font-semibold">{feature.title}</h3>
											<p className="text-sm text-muted-foreground">
												{feature.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="relative">
							<div className="absolute -inset-4 rounded-3xl bg-linear-to-r from-primary/20 via-primary/10 to-primary/20 blur-2xl" />
							<Card className="relative overflow-hidden border-2 border-primary/20 bg-linear-to-br from-card to-card/80">
								<CardHeader className="border-b bg-primary/5 pb-6">
									<div className="flex items-center justify-between">
										<div>
											<CardDescription>Il tuo saldo</CardDescription>
											<CardTitle className="text-4xl font-bold">
												12.450{" "}
												<span className="text-lg font-normal text-muted-foreground">
													punti
												</span>
											</CardTitle>
										</div>
										<div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/70 text-white shadow-lg">
											<Sparkles className="size-8" />
										</div>
									</div>
								</CardHeader>
								<CardContent className="pt-6">
									<div className="mb-6">
										<div className="mb-2 flex justify-between text-sm">
											<span className="text-muted-foreground">
												Prossimo livello
											</span>
											<span className="font-medium">Gold Member</span>
										</div>
										<div className="h-3 overflow-hidden rounded-full bg-muted">
											<div
												className="h-full rounded-full bg-linear-to-r from-primary to-primary/70 transition-all duration-500"
												style={{ width: "75%" }}
											/>
										</div>
										<p className="mt-2 text-xs text-muted-foreground">
											2.550 punti per raggiungere Gold
										</p>
									</div>

									<div className="space-y-3">
										<h4 className="font-semibold">Attività recenti</h4>
										{[
											{
												shop: "Bottega del Gusto",
												points: "+150",
												date: "Oggi",
											},
											{
												shop: "Libreria Aurora",
												points: "+80",
												date: "Ieri",
											},
											{
												shop: "Fioreria Rosa",
												points: "+45",
												date: "2 giorni fa",
											},
										].map((activity) => (
											<div
												key={activity.shop + activity.date}
												className="flex items-center justify-between rounded-lg bg-muted/50 p-3 text-sm"
											>
												<span>{activity.shop}</span>
												<div className="flex items-center gap-3">
													<span className="text-xs text-muted-foreground">
														{activity.date}
													</span>
													<Badge
														variant="secondary"
														className="bg-green-500/10 text-green-600"
													>
														{activity.points}
													</Badge>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Impact Section */}
			<section className="bg-linear-to-br from-primary to-primary/80 py-20 text-primary-foreground md:py-28">
				<div className="container mx-auto px-4">
					<div className="mb-16 text-center">
						<Badge
							variant="secondary"
							className="mb-4 bg-white/20 text-white hover:bg-white/30"
						>
							Il nostro impatto
						</Badge>
						<h2 className="mb-4 text-3xl font-bold sm:text-4xl">
							Insieme stiamo cambiando le cose
						</h2>
						<p className="mx-auto max-w-2xl text-primary-foreground/80">
							Ogni acquisto locale contribuisce a mantenere viva la tua
							comunità. Ecco cosa abbiamo raggiunto insieme.
						</p>
					</div>

					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{[
							{
								icon: Building2,
								value: "523",
								label: "Negozi salvati dal fallimento",
								description: "Attività che hanno ripreso a crescere",
							},
							{
								icon: Users,
								value: "15.2K",
								label: "Famiglie supportate",
								description: "Posti di lavoro mantenuti nella comunità",
							},
							{
								icon: HandHeart,
								value: "€2.5M",
								label: "Reinvestiti localmente",
								description: "Denaro che rimane nella tua città",
							},
							{
								icon: TrendingUp,
								value: "+47%",
								label: "Crescita media negozi",
								description: "Incremento fatturato partner BIBS",
							},
						].map((stat) => (
							<div
								key={stat.label}
								className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
							>
								<div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-white/20">
									<stat.icon className="size-7" />
								</div>
								<div className="mb-1 text-4xl font-bold">{stat.value}</div>
								<div className="mb-2 font-medium">{stat.label}</div>
								<p className="text-sm text-primary-foreground/70">
									{stat.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Benefits */}
			<section className="py-20 md:py-28">
				<div className="container mx-auto px-4">
					<div className="mb-16 text-center">
						<Badge variant="outline" className="mb-4">
							Perché BIBS
						</Badge>
						<h2 className="mb-4 text-3xl font-bold sm:text-4xl">
							Vantaggi per <span className="text-primary">tutti</span>
						</h2>
					</div>

					<div className="grid gap-8 lg:grid-cols-2">
						{/* For Users */}
						<Card className="overflow-hidden">
							<CardHeader className="bg-linear-to-r from-primary/10 to-primary/5">
								<div className="flex items-center gap-3">
									<div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white">
										<Users className="size-6" />
									</div>
									<div>
										<CardTitle>Per te, utente</CardTitle>
										<CardDescription>
											Risparmia mentre fai del bene
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="pt-6">
								<ul className="space-y-4">
									{[
										"Accumula punti su ogni acquisto locale",
										"Sconti esclusivi fino al 30% nei negozi partner",
										"Scopri negozi unici nella tua zona",
										"Contribuisci a salvare le attività locali",
										"Partecipa a eventi e promozioni speciali",
									].map((benefit) => (
										<li key={benefit} className="flex items-center gap-3">
											<div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600">
												<Check className="size-3.5" />
											</div>
											<span>{benefit}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>

						{/* For Shops */}
						<Card className="overflow-hidden">
							<CardHeader className="bg-linear-to-r from-amber-500/10 to-orange-500/5">
								<div className="flex items-center gap-3">
									<div className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-amber-500 to-orange-500 text-white">
										<Store className="size-6" />
									</div>
									<div>
										<CardTitle>Per te, negoziante</CardTitle>
										<CardDescription>
											Fai crescere la tua attività
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="pt-6">
								<ul className="space-y-4">
									{[
										"Aumenta la visibilità nella tua comunità",
										"Fidelizza i clienti con il sistema punti",
										"Zero costi di iscrizione per il primo anno",
										"Dashboard analytics per monitorare le vendite",
										"Supporto marketing e promozioni dedicate",
									].map((benefit) => (
										<li key={benefit} className="flex items-center gap-3">
											<div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
												<Check className="size-3.5" />
											</div>
											<span>{benefit}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="bg-muted/30 py-20 md:py-28">
				<div className="container mx-auto px-4">
					<div className="mb-16 text-center">
						<Badge variant="outline" className="mb-4">
							Testimonianze
						</Badge>
						<h2 className="text-3xl font-bold sm:text-4xl">
							Cosa dicono di noi
						</h2>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{[
							{
								name: "Maria Rossi",
								role: "Utente BIBS da 2 anni",
								avatar: "👩",
								quote:
									"Grazie a BIBS ho scoperto negozi fantastici a due passi da casa che non conoscevo. Ho già risparmiato oltre 200€ con i punti accumulati!",
								rating: 5,
							},
							{
								name: "Giuseppe Bianchi",
								role: "Proprietario, Bottega del Gusto",
								avatar: "👨‍🍳",
								quote:
									"Da quando siamo su BIBS, il nostro fatturato è aumentato del 35%. I clienti tornano più spesso grazie al sistema punti.",
								rating: 5,
							},
							{
								name: "Anna Verdi",
								role: "Utente BIBS",
								avatar: "👩‍💼",
								quote:
									"Finalmente un'app che mi permette di fare shopping in modo consapevole. Supporto la mia comunità e risparmio allo stesso tempo!",
								rating: 5,
							},
						].map((testimonial) => (
							<Card key={testimonial.name} className="relative overflow-hidden">
								<div className="absolute right-4 top-4 text-6xl opacity-10">
									"
								</div>
								<CardHeader>
									<div className="flex items-center gap-4">
										<div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-3xl">
											{testimonial.avatar}
										</div>
										<div>
											<CardTitle className="text-base">
												{testimonial.name}
											</CardTitle>
											<CardDescription>{testimonial.role}</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<div className="mb-4 flex gap-1">
										{Array.from({ length: testimonial.rating }).map((_, i) => (
											<Star
												key={`star-${testimonial.name}-${i}`}
												className="size-4 fill-amber-400 text-amber-400"
											/>
										))}
									</div>
									<p className="text-muted-foreground">"{testimonial.quote}"</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="py-20 md:py-28">
				<div className="container mx-auto px-4">
					<div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-primary/90 to-primary/80 p-8 text-center text-primary-foreground md:p-16">
						{/* Background decoration */}
						<div className="absolute inset-0 overflow-hidden">
							<div className="absolute -right-20 -top-20 size-40 rounded-full bg-white/10 blur-2xl" />
							<div className="absolute -bottom-20 -left-20 size-40 rounded-full bg-white/10 blur-2xl" />
						</div>

						<div className="relative">
							<Badge
								variant="secondary"
								className="mb-6 bg-white/20 text-white hover:bg-white/30"
							>
								<Heart className="mr-1.5 size-3.5" />
								Unisciti alla community
							</Badge>

							<h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
								Pronto a fare la differenza?
							</h2>

							<p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
								Unisciti a migliaia di persone che stanno già supportando i
								negozi locali della propria città. Registrati gratuitamente e
								inizia ad accumulare punti oggi stesso.
							</p>

							<div className="flex flex-col justify-center gap-4 sm:flex-row">
								<Button
									size="lg"
									variant="secondary"
									className="group gap-2 text-base"
								>
									Registrati gratis
									<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="gap-2 border-white/30 bg-transparent text-base text-white hover:bg-white/10 hover:text-white"
								>
									<Store className="size-4" />
									Iscrivi il tuo negozio
								</Button>
							</div>

							<p className="mt-8 text-sm text-primary-foreground/60">
								Nessuna carta di credito richiesta • Inizia in 30 secondi
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Footer note */}
			<section className="border-t py-8">
				<div className="container mx-auto px-4 text-center">
					<p className="text-sm text-muted-foreground">
						<span className="font-semibold text-foreground">BIBS</span> - Buy
						In, Be Smart • Supporta il commercio locale, un acquisto alla volta.
					</p>
				</div>
			</section>
		</div>
	);
}
