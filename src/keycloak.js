import Keycloak from "keycloak-js";
import { config } from "./Constants";

export const keycloak = new Keycloak({
  url: `${config.url.KEYCLOAK_BASE_URL}/auth`,
  realm: "Wizlit",
  clientId: "wizlit-ui",
});
export const initOptions = {
  pkceMethod: "S256",
  onLoad: "check-sso",
  // checkLoginIframe: false,
  // silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
};
