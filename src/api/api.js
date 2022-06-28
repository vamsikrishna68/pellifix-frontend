import axios from "axios";
axios.defaults.baseURL = "https://api.pellifix.com/v1/";
import {getToken} from '../utils/helper'


axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
        console.log(error)
      if (error.response &&
        error.response.status === 401) {
        // window.localStorage.removeItem("pfToken");
      }
      return Promise.reject(error);
    }
  );

  const apiService=({
    url = "",
    method = "GET",
    body = null,
    authToken = getToken(),
    headers = {},
  })=> {
    const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
    if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
    if (authToken) {
      headers['Authorization']= `Bearer ${authToken}` 
    }
    return axios.request({
      url,
      method,
      headers,
      [dataOrParams]: body,
    });
  }


  export const getProfileData = () => {
    return apiService({
      url: "/profiles",
      method: "GET",
    });
  };

  export const updateProfileData =(payload)=>{
    return apiService({
        url: "/profiles",
        method: "PATCH",
        body:payload
      });
  }