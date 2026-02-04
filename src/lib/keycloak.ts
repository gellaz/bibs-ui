import Keycloak from "keycloak-js";

import { env } from "@/env";

let keycloakInstance: Keycloak | null = null;

export function getKeycloak(): Keycloak {
	if (!keycloakInstance) {
		keycloakInstance = new Keycloak({
			url: env.VITE_KEYCLOAK_URL,
			realm: env.VITE_KEYCLOAK_REALM,
			clientId: env.VITE_KEYCLOAK_CLIENT_ID,
		});
	}
	return keycloakInstance;
}
