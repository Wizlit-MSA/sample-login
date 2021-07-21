import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/misc/Navbar";
import PrivateRoute from "./components/misc/PrivateRoute";
import UserDetail from "./components/users/UserDetail";
import UsersPage from "./components/users/UsersPage";
import { useKeycloak } from "@react-keycloak/web";

function App() {
  const { initialized, keycloak } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (keycloak.authenticated) {
    keycloak.loadUserProfile().then((profile) => {
      const userId = profile.attributes.userId
        ? profile.attributes.userId[0]
        : -1;
      console.log(userId);
    });
  }

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <PrivateRoute path="/user-service/all" component={UsersPage} />
        <PrivateRoute path="/user-service/:username" component={UserDetail} />
      </Switch>
    </Router>
  );
}

export default App;
