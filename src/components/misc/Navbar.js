import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { NavLink, withRouter } from "react-router-dom";
import { Container, Dropdown, Menu } from "semantic-ui-react";
import { isAdmin } from "../misc/Helpers";

function Navbar(props) {
  const { keycloak } = useKeycloak();

  const handleLogInOut = () => {
    if (keycloak.authenticated) {
      props.history.push("/");
      keycloak.logout();
    } else {
      keycloak.login();
    }
  };

  const checkAuthenticated = () => {
    if (!keycloak.authenticated) {
      handleLogInOut();
    }
  };

  const getUsername = () => {
    return (
      keycloak.authenticated &&
      keycloak.tokenParsed &&
      keycloak.tokenParsed.preferred_username
    );
  };

  const getLogInOutText = () => {
    return keycloak.authenticated ? "Logout" : "Login";
  };

  const getAdminMenuStyle = () => {
    return keycloak.authenticated && isAdmin(keycloak)
      ? { display: "block" }
      : { display: "none" };
  };

  return (
    <Menu stackable>
      <Container>
        <Menu.Item header>Wizlit UI</Menu.Item>
        <Menu.Item as={NavLink} exact to="/home">
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} exact to="/user-service/all">
          Users
        </Menu.Item>

        <Menu.Menu position="right">
          {keycloak.authenticated && (
            <Menu.Item as={NavLink} exact to="#">
              Hi {getUsername()}
            </Menu.Item>
          )}
          <Menu.Item as={NavLink} exact to="/login" onClick={handleLogInOut}>
            {getLogInOutText()}
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            exact
            to="/test"
            onClick={() => keycloak.accountManagement()}
          >
            test
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default withRouter(Navbar);
