import { Bell } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
	id: string;
	title: string;
	message: string;
	timestamp: Date;
	read: boolean;
}

// Mock data - da sostituire con dati reali
const mockNotifications: Notification[] = [];
const mockArchivedNotifications: Notification[] = [];

export function NotificationsMenu() {
	const [newNotifications] = useState<Notification[]>(mockNotifications);
	const [archivedNotifications] = useState<Notification[]>(
		mockArchivedNotifications,
	);

	const hasNewNotifications = newNotifications.length > 0;
	const hasArchivedNotifications = archivedNotifications.length > 0;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="relative"
					aria-label="Notifiche"
				>
					<Bell className="size-5" />
					{hasNewNotifications && (
						<span className="absolute top-1 right-1 size-2 rounded-full bg-destructive" />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-96 p-0">
				<Tabs defaultValue="new" className="w-full">
					<div className="border-b px-4 pt-3">
						<TabsList variant="line" className="grid w-full grid-cols-2">
							<TabsTrigger
								value="new"
								className="data-[state=active]:text-primary data-[state=active]:after:bg-primary"
							>
								Nuove
							</TabsTrigger>
							<TabsTrigger
								value="archived"
								className="data-[state=active]:text-primary data-[state=active]:after:bg-primary"
							>
								Archiviate
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="new" className="m-0 p-4">
						{hasNewNotifications ? (
							<div className="space-y-2">
								{newNotifications.map((notification) => (
									<div
										key={notification.id}
										className="rounded-lg border p-3 hover:bg-accent transition-colors cursor-pointer"
									>
										<div className="flex items-start justify-between gap-2">
											<div className="flex-1 space-y-1">
												<p className="text-sm font-medium">
													{notification.title}
												</p>
												<p className="text-xs text-muted-foreground">
													{notification.message}
												</p>
												<p className="text-xs text-muted-foreground">
													{notification.timestamp.toLocaleDateString()}
												</p>
											</div>
											{!notification.read && (
												<span className="size-2 rounded-full bg-primary mt-1 shrink-0" />
											)}
										</div>
									</div>
								))}
							</div>
						) : (
							<Empty>
								<EmptyHeader>
									<EmptyMedia variant="icon">
										<Bell className="size-6" />
									</EmptyMedia>
									<EmptyTitle>Nessuna notifica</EmptyTitle>
									<EmptyDescription>
										Non hai nuove notifiche al momento.
									</EmptyDescription>
								</EmptyHeader>
							</Empty>
						)}
					</TabsContent>

					<TabsContent value="archived" className="m-0 p-4">
						{hasArchivedNotifications ? (
							<div className="space-y-2">
								{archivedNotifications.map((notification) => (
									<div
										key={notification.id}
										className="rounded-lg border p-3 hover:bg-accent transition-colors cursor-pointer opacity-60"
									>
										<div className="flex items-start justify-between gap-2">
											<div className="flex-1 space-y-1">
												<p className="text-sm font-medium">
													{notification.title}
												</p>
												<p className="text-xs text-muted-foreground">
													{notification.message}
												</p>
												<p className="text-xs text-muted-foreground">
													{notification.timestamp.toLocaleDateString()}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<Empty>
								<EmptyHeader>
									<EmptyMedia variant="icon">
										<Bell className="size-6" />
									</EmptyMedia>
									<EmptyTitle>Nessuna notifica archiviata</EmptyTitle>
									<EmptyDescription>
										Non hai notifiche archiviate.
									</EmptyDescription>
								</EmptyHeader>
							</Empty>
						)}
					</TabsContent>
				</Tabs>
			</PopoverContent>
		</Popover>
	);
}
