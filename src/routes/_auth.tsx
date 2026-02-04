import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_auth")({
	beforeLoad: async ({ context }) => {
		// Aspetta che Keycloak sia inizializzato prima di decidere
		if (context.auth.ready && !context.auth.isAuthenticated) {
			// Usa window.location.href per ottenere l'URL completo (non solo il path)
			await context.auth.login(window.location.href);
		}
	},
	component: AuthLayout,
});

function AuthLayout() {
	const auth = useAuth();

	// Se beforeLoad è passato con ready=false, al re-render qui gestiamo il redirect
	useEffect(() => {
		if (auth.ready && !auth.isAuthenticated) {
			auth.login(window.location.href).catch((err) => {
				console.error("Login redirect failed:", err);
			});
		}
	}, [auth.ready, auth.isAuthenticated, auth]);

	if (!auth.ready) {
		return (
			<div className="p-2 h-full flex items-center justify-center">
				<p>Initializing…</p>
			</div>
		);
	}

	if (!auth.isAuthenticated) {
		return (
			<div className="p-2 h-full flex items-center justify-center">
				<p>Redirecting to login…</p>
			</div>
		);
	}

	return <Outlet />;
}
