import React from "react";
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
import { Navigate, Outlet } from "react-router-dom";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: !isLoggedIn ? <Welcome /> : <Navigate to="/home" />, 
  },
  {
    path: "login",
    element: !isLoggedIn ? <Login /> : <Navigate to="/home" />,
  },
  {
    path: "admin-login",
    element: !isLoggedIn ? <AdminLogin /> : <Navigate to="/home" />,
  },
  {
    path: "register",
    element: !isLoggedIn ? <Register /> : <Navigate to="/home" />,
  },
  {
    path: "forgot-password",
    element: !isLoggedIn ? <ForgotPassword /> : <Navigate to="/home" />,
  },
  {
    path: "reset-password",
    element: !isLoggedIn ? <ResetPassword /> : <Navigate to="/home" />,
  },
  {
    path: "auth",
    element: isLoggedIn ? <Layout /> : <Navigate to="/" />,
    children: [
      { path:"home", element:<Home /> },
      { path:"wishList", element:<WishList /> },
      { path:"profile", element:<Profile /> },
      { path:"edit-profile", element:<EditProfile /> },
      { path:"view-profile", element:<ViewProfile /> },
      { path:"edit-preference", element:<EditPreferences /> },
      { path:"sub-ordinates", element:<SubOrdinates /> },
      { path:"associates", element:<Associates /> },
      { path:"admin-dashboard", element:<AdminDashboard /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound /> ,
  },
];

export default routes;
