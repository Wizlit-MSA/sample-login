import { useKeycloak } from "@react-keycloak/web";
import React, { useState } from "react";
import { usersApi } from "../misc/UsersApi";

const UsersPage = (props) => {
  const [user, setUser] = useState({});
  const { keycloak } = useKeycloak();

  React.useEffect(() => {
    const handleGetUser = async () => {
      try {
        const response = await usersApi.getUser(
          props.match.params.username,
          keycloak.token
        );
        const user = response.data;
        setUser(user);
      } catch (error) {
        //   handleLogError(error);
      }
    };
    handleGetUser();
  }, []);

  return (
    <>
      <div>User</div>
      <div>
        <p>User name : {user.name}</p>
        <p>User Avatar : {user.avatar}</p>
      </div>
    </>
  );
};

export default UsersPage;
