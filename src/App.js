import React from 'react'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Login from "./pages/Login/Login";
import Welcome from "./pages/Welcome/Welcome"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import Register from './pages/Register/Register';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import WishList from './pages/WishList'
import Profile from './pages/Profile/Profile'
import { PrivateRoute } from './utils/privateRoute';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ViewProfile from './pages/ViewProfile/ViewProfile'
import EditProfile from './pages/EditProfile/EditProfile'
import EditPreferences from './pages/EditPreferences/EditPreferences';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import SubOrdinates from './pages/SubOrdinates/SubOrdinates';
import Associates from './pages/Associates/Associates'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

let theme = createTheme({
  palette: {
    primary: {
      main: '#D53833',
    },
    secondary: {
      main: '#F7C254',
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="admin-login" element={<AdminLogin />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="forgot-password" element={<ForgotPassword />}></Route>
            <Route path="reset-password" element={<ResetPassword />}></Route>
            <Route
              exact
              path="auth"
              element={
                // <PrivateRoute>
                  <Layout />
                // </PrivateRoute>
              }
            >
              <Route path="home" element={<Home />} />
              <Route path="wishList" element={<WishList />} />
              <Route path="profile" element={<Profile />} />
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="view-profile" element={<ViewProfile />} />
              <Route path="edit-preference" element={<EditPreferences />} />
              <Route path="sub-ordinates" element={<SubOrdinates />} />
              <Route path='associates' element={<Associates/>} />
              <Route path='admin-dashboard' element={<AdminDashboard/>} />
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </React.StrictMode >
  );
}

export default App;
