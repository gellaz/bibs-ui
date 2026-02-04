import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getKeycloak } from "./keycloak";

const keycloak = getKeycloak();

const initPromise = keycloak.init({
	onLoad: "check-sso",
	pkceMethod: "S256",
	checkLoginIframe: false,
});

export interface UserInfo {
	sub?: string;
	preferred_username?: string;
	name?: string;
	email?: string;
	given_name?: string;
	family_name?: string;
	roles: string[];
}

function parseUserInfo(): UserInfo | undefined {
	const parsed = keycloak.idTokenParsed ?? keycloak.tokenParsed;
	if (!parsed) return undefined;

	// Combina ruoli dal realm e dalle risorse client
	const realmRoles = keycloak.realmAccess?.roles ?? [];
	const resourceRoles = Object.values(keycloak.resourceAccess ?? {}).flatMap(
		(r) => r.roles,
	);
	const roles = [...new Set([...realmRoles, ...resourceRoles])];
	console.log(realmRoles);
	console.log(resourceRoles);

	return {
		sub: parsed.sub,
		preferred_username: parsed.preferred_username,
		name: parsed.name,
		email: parsed.email,
		given_name: parsed.given_name,
		family_name: parsed.family_name,
		roles,
	};
}

export interface IAuthContext {
	ready: boolean;
	isAuthenticated: boolean;
	token?: string;
	userInfo?: UserInfo;
	login: (redirectUri?: string) => Promise<void>;
	logout: (redirectUri?: string) => Promise<void>;
	updateToken: (minValiditySeconds?: number) => Promise<string | undefined>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [ready, setReady] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);
	const [token, setToken] = useState<string | undefined>(undefined);
	const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

	useEffect(() => {
		let mounted = true;

		const applyKeycloakState = () => {
			setAuthenticated(keycloak.authenticated ?? false);
			setToken(keycloak.token ?? undefined);
			setUserInfo(parseUserInfo());
			setReady(true);

			keycloak.onTokenExpired = async () => {
				try {
					await keycloak.updateToken(30);
					setToken(keycloak.token ?? undefined);
					setUserInfo(parseUserInfo());
				} catch {
					setAuthenticated(false);
					setToken(undefined);
					setUserInfo(undefined);
				}
			};

			keycloak.onAuthSuccess = () => {
				setAuthenticated(true);
				setToken(keycloak.token ?? undefined);
				setUserInfo(parseUserInfo());
			};

			keycloak.onAuthLogout = () => {
				setAuthenticated(false);
				setToken(undefined);
				setUserInfo(undefined);
			};
		};

		(async () => {
			try {
				await initPromise;

				if (!mounted) return;

				applyKeycloakState();
			} catch (err) {
				console.error("Keycloak init failed:", err);
				if (mounted) {
					setAuthenticated(false);
					setToken(undefined);
					setUserInfo(undefined);
					setReady(true);
				}
			}
		})();

		return () => {
			mounted = false;
		};
	}, []);

	const value = useMemo<IAuthContext>(
		() => ({
			ready,
			isAuthenticated: authenticated,
			token,
			userInfo,
			login: async (redirectUri) => {
				await keycloak.login({
					redirectUri: redirectUri ?? window.location.href,
				});
			},
			logout: async (redirectUri) => {
				await keycloak.logout({
					redirectUri: redirectUri ?? window.location.origin,
				});
			},
			updateToken: async (minValiditySeconds = 30) => {
				if (!keycloak.authenticated) return undefined;
				await keycloak.updateToken(minValiditySeconds);
				setToken(keycloak.token ?? undefined);
				setUserInfo(parseUserInfo());
				return keycloak.token ?? undefined;
			},
		}),
		[ready, authenticated, token, userInfo],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
