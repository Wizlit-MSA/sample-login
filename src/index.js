import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { initOptions, keycloak } from "./keycloak";
import { Dimmer, Header, Icon } from "semantic-ui-react";
import { ReactKeycloakProvider } from "@react-keycloak/web";

import * as serviceWorker from "./serviceWorker";

const loadingComponent = (
  <Dimmer inverted active={true} page>
    <Header style={{ color: "#4d4d4d" }} as="h2" icon inverted>
      <Icon loading name="cog" />
      <Header.Content>
        Keycloak is loading
        <Header.Subheader style={{ color: "#4d4d4d" }}>
          or running authorization code flow with PKCE
        </Header.Subheader>
      </Header.Content>
    </Header>
  </Dimmer>
);

ReactDOM.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={initOptions}
    LoadingComponent={loadingComponent}
  >
    <App />
  </ReactKeycloakProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
