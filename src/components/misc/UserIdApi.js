import axios from "axios";
import { config } from "../../Constants";

export const userIdApi = {
  createUserId,
  getUserId,
};

function createUserId(sub) {
  return instance.post("/user/" + sub, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(token),
    },
  });
}

function getUserId(sub) {
  return instance.get("/user/" + sub, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(token),
    },
  });
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.USER_ID_URL,
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
