import { useKeycloak } from "@react-keycloak/web";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usersApi } from "../misc/UsersApi";

const UsersPage = (props) => {
  const [users, setUsers] = useState([]);
  const { keycloak, initialized } = useKeycloak();

  React.useEffect(() => {
    const handleGetUsers = async () => {
      try {
        const userId = await keycloak.loadUserProfile().then((profile) => {
          return profile.attributes.userId ? profile.attributes.userId[0] : -1;
        });

        const response = await usersApi.getUser(userId, keycloak.token);
        const users = response.data;
        setUsers(users);
        console.log(users);
      } catch (error) {
        //   handleLogError(error);
      }
    };
    handleGetUsers();
  }, []);

  const {} = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return users ? (
    <>
      <div>Users</div>
      <div key={users.name} style={{ border: "1px solid" }}>
        <p>
          User name : <Link to={`/user-service/${0}`}>{0}</Link>
          {/* <a href={`/user-service/${user.username}`}>{user.username}</a> */}
        </p>
      </div>
      {/* {users.map((user, idx) => {
        return (
          <div key={idx} style={{ border: "1px solid" }}>
            <p>
              User name :{" "}
              <Link to={`/user-service/${user.username}`}>{user.username}</Link>
              {/* <a href={`/user-service/${user.username}`}>{user.username}</a> }
            </p>
          </div>
        );
      })} */}
    </>
  ) : (
    <div>Null</div>
  );
};

export default UsersPage;
