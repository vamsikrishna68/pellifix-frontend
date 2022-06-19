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
import WhistList from './pages/Whistlist/Whistlist'
import Profile from './pages/Profile/Profile'
import { PrivateRoute } from './utils/privateRoute';


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
            <Route path="register" element={<Register />}></Route>
            <Route
              exact
              path="auth"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route path="home" element={<Home />} />
              <Route path="wishList" element={<WhistList />} />
              <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </React.StrictMode >
  );
}

export default App;
