import React from "react";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login/Login";
import Welcome from "../pages/Welcome/Welcome";
import Register from "../pages/Register/Register";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
import WishList from "../pages/WishList";
import Profile from "../pages/Profile/Profile";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import ViewProfile from "../pages/ViewProfile/ViewProfile";
import EditProfile from "../pages/EditProfile/EditProfile";
import EditPreferences from "../pages/EditPreferences/EditPreferences";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import SubOrdinates from "../pages/SubOrdinates/SubOrdinates";
import Associates from "../pages/Associates/Associates";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

/**
 * List of routes for the page
 */
export const ROUTE = {
  public: [
    {
      exact: true,
      path: "/",
      meta: {},
      name: "Welcome",
      element: <Welcome/>,
    },
    {
      exact: true,
      path: "/login",
      meta: {},
      element: <Login/>,
    },
  ],
  private: [
    {
      exact: true,
      path: "/home",
      meta: {},
      name: "Home",
      element: <Home/>,
    },
  ],
};

/**
 * Function to set route info
 * @param {routeName} routeName
 */
export const setRoutes = (routeName) => {
  routeName = routeName || "public";
  const route = ROUTE[routeName];
  console.log({route,routeName});
  return route.map((eachRoute, index) => {
    if (routeName === "private") {
      return <PrivateRoute key={index} {...eachRoute} />;
    } else {
      return <PublicRoute key={index} {...eachRoute} />;
    }
  });
};
