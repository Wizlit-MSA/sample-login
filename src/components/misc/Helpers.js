import { config } from "../../Constants";

export const isAdmin = (keycloak) => {
  return (
    keycloak &&
    keycloak.tokenParsed &&
    keycloak.tokenParsed.realm_access.roles.includes("user")
  );
};

export const handleLogError = (error) => {
  if (error.response) {
    console.log(error.response.data);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log(error.message);
  }
};
