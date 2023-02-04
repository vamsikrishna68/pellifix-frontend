import React from "react";
import Login from "../pages/Login/Login";
import Welcome from "../pages/Welcome/Welcome";
import Register from "../pages/Register/Register";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
import WishList from "../pages/WishList";
import ViewedProfile from "../pages/ViewedProfile";
import DailyRecomProfilePage from "../pages/Home/ProfilePage";
import HoroscopeProfilePage from "../pages/Home/ProfilePage/HoroscopeProfilePage";
import PreferenceProfiePage from "../pages/Home/ProfilePage/PreferenceProfiePage";
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
import TermsAndConditions from "../pages/Agreement/TermsAndConditions";
import PrivacyPolicy from "../pages/Agreement/PrivacyPolicy";
import { Navigate, Outlet } from "react-router-dom";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: !isLoggedIn ? <Welcome /> : <Navigate to="/auth/home" />,
  },
  {
    path: "login",
    element: !isLoggedIn ? <Login /> : <Navigate to="/auth/home" />,
  },
  {
    path: "admin-login",
    element: !isLoggedIn ? <AdminLogin /> : <Navigate to="/auth/home" />,
  },
  {
    path: "associates/login",
    element: !isLoggedIn ? <Login /> : <Navigate to="/auth/home" />,
  },
  {
    path: "register",
    element: !isLoggedIn ? <Register /> : <Navigate to="/auth/home" />,
  },
  {
    path: "forgot-password",
    element: !isLoggedIn ? <ForgotPassword /> : <Navigate to="/auth/home" />,
  },
  {
    path: "associates/forgot-password",
    element: !isLoggedIn ? <ForgotPassword /> : <Navigate to="/auth/home" />,
  },
  {
    path: "reset-password/:id",
    element: !isLoggedIn ? <ResetPassword /> : <Navigate to="/auth/home" />,
  },
  {
    path: "associates/reset-password/:id",
    element: !isLoggedIn ? <ResetPassword /> : <Navigate to="/auth/home" />,
  },
  {
    path: "terms-and-conditions",
    element: !isLoggedIn ? <TermsAndConditions /> : <Navigate to="/auth/home" />,
  },  {
    path: "privacy-policy",
    element: !isLoggedIn ? <PrivacyPolicy /> : <Navigate to="/auth/home" />,
  },
  {
    path: "auth",
    element: isLoggedIn ? <Layout /> : <Navigate to="/" />,
    children: [
      { path: "home", element: <Home /> },
      { path: `home/daily-recommendation`, element: <DailyRecomProfilePage /> },
      { path: `home/horoscopic`, element: <HoroscopeProfilePage /> },
      { path: `home/preference`, element: <PreferenceProfiePage /> },
      { path: "home/view-profile/:id", element: <ViewProfile /> },
      { path: "wishList", element: <WishList /> },
      { path: `wishList/view-profile/:id`, element: <ViewProfile /> },
      { path: "profile", element: <Profile /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "edit-preference", element: <EditPreferences /> },
      { path: "profile-viewed", element: <ViewedProfile /> },
      { path: `profile-viewed/view-profile/:id`, element: <ViewProfile /> },
      { path: "sub-ordinates", element: <SubOrdinates /> },
      { path: "associates", element: <Associates /> },
      { path: "admin-dashboard", element: <AdminDashboard /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default routes;
