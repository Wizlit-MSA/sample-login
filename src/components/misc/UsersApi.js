import axios from "axios";
import { config } from "../../Constants";

export const usersApi = {
  getUsers,
  getUser,
};

function getUsers(token) {
  return instance.get("/users", {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(token),
    },
  });
}

function getUser(userId, token) {
  return instance.get("/users/" + userId, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(token),
    },
  });
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 404) {
      return { status: error.response.status };
    }
    return Promise.reject(error.response);
  }
);

// -- Helper functions

function bearerAuth(token) {
  return `Bearer ${token}`;
}
