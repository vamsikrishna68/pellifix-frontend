import {  isString } from "lodash";
import { ls } from "./localStorage";

class Authorization {
  constructor() {
    this.authUser = null;
  }

  /**
   * set auth user details to class property
   *
   * @return void
   */
  setAuthUser() {
    this.authUser = JSON.parse(ls.getItem("authorizedUserDetails"));
  }

  /**
   * check is active user is logged in
   *
   * @return boolean
   */
  isLoggedIn() {
    return typeof ls.getItem("authorizedUserDetails") === "string";
  }
  
  /**
   * get logged in user details
   *
   * @return boolean
   */
  getAuthUser() {
    if (this.isLoggedIn()) {
      this.setAuthUser();
    }

    return this.authUser;
  }

  /**
   * Get authentication access token
   *
   * @return string
   */
  getAccessToken() {
    let accessToken = null;
    const authUser = this.getAuthUser();
    if (authUser && isString(authUser.token)) {
      accessToken = authUser.token;
    }
    return accessToken;
  }

  /**
   * login the user by setting it in local storage
   *
   * @return boolean
   */
  login(userDetails) {
    if (typeof Storage !== "undefined") {
      ls.removeItem("authorizedUserDetails");
      ls.setItem("authorizedUserDetails", JSON.stringify(userDetails));
    } else {
      console.error("Local storage is not supported");
    }
  }

  /**
   * get logged in user details
   *
   * @return boolean
   */
  logout() {
    if (typeof Storage !== "undefined") {
      ls.removeItem("authorizedUserDetails");
      ls.removeItem("userLandingPath");
      window.location.href = "/";
    } else {
      console.error("Local storage is not supported");
    }
  }

}

export default new Authorization();
