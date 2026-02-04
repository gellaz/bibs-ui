import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";

import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { AuthProvider, type IAuthContext, useAuth } from "@/lib/auth.tsx";
import reportWebVitals from "./reportWebVitals.ts";

// Create a new router instance

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
const router = createRouter({
	routeTree,
	context: {
		...TanStackQueryProviderContext,
		auth: undefined as unknown as IAuthContext,
	},
	// Paraglide URL rewrite docs: https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#rewrite-url
	rewrite: {
		input: ({ url }) => deLocalizeUrl(url),
		output: ({ url }) => localizeUrl(url),
	},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function InnerApp() {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
	return (
		<AuthProvider>
			<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
				<InnerApp />
			</ThemeProvider>
		</AuthProvider>
	);
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
				<App />
			</TanStackQueryProvider.Provider>
		</StrictMode>,
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
