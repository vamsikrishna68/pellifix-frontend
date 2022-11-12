import axios from "axios";
axios.defaults.baseURL = "https://api.pellifix.com/v1/";
import Authorization from "../utils/authorization";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      // window.localStorage.removeItem("pfToken");
    }
    return Promise.reject(error);
  }
);

const apiService = ({
  url = "",
  method = "GET",
  body = null,
  authToken = Authorization.getAccessToken(),
  headers = {},
}) => {
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  } else delete headers.Authorization;
  return axios.request({
    url,
    method,
    headers,
    [dataOrParams]: body,
  });
};

export const getProfileData = () => {
  return apiService({
    url: "/profiles",
    method: "GET",
  });
};

export const updateProfileData = (payload) => {
  return apiService({
    url: "/profiles",
    method: "PATCH",
    body: payload,
  });
};

export const getPreferenceData = () => {
  return apiService({
    url: "/profile/preferences",
    method: "GET",
  });
};

export const updatePreferenceData = (payload) => {
  return apiService({
    url: "/profile/preferences",
    method: "PATCH",
    body: payload,
  });
};

export const uploadImages = (payload) => {
  return apiService({
    url: "/profiles/images/uploads",
    method: "POST",
    body: payload
  });
}

export const getDropwdownValues = () => {
  return apiService({
    url: "/reference/drop-down",
    method: "GET"
  });
}

export const getStates = () => {
  return apiService({
    url: "/reference/states",
    method: "GET"
  });
}

export const getWishList = () => {
  return apiService({
    url: "/users/shortlist",
    method: "GET",
  });
};


export const verifyPhone = (payload) => {
  return apiService({
    url: "/customer/otp/verify",
    method: "PATCH",
    body: payload,
  });
};

export const generateOtp = (payload) => {
  return apiService({
    url: "/customer/otp/generate",
    method: "PATCH",
    body: payload,
  });
};
