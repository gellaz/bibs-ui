import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Navbar } from "@/components/navbar";
import type { IAuthContext } from "@/lib/auth";
import { getLocale, shouldRedirect } from "@/paraglide/runtime";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

interface MyRouterContext {
	queryClient: QueryClient;
	auth: IAuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => {
		// Other redirect strategies are possible; see
		// https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
		if (typeof document !== "undefined") {
			document.documentElement.setAttribute("lang", getLocale());
		}

		// Client-side fallback redirect for SPA/file-router builds. Start apps should
		// prefer server-side paraglideMiddleware (see start template server.ts).
		if (typeof window !== "undefined") {
			const decision = await shouldRedirect({ url: window.location.href });

			if (decision.redirectUrl) {
				throw redirect({ href: decision.redirectUrl.href });
			}
		}
	},

	component: () => (
		<>
			<Navbar />
			<Outlet />
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
					TanStackQueryDevtools,
				]}
			/>
		</>
	),
});
