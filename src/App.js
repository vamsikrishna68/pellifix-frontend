import React from "react";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import Authorization from "./utils/authorization";
import routes from './rotues/config';


let theme = createTheme({
  palette: {
    primary: {
      main: "#D53833",
    },
    secondary: {
      main: "#F7C254",
    },
  },
});

function AppRoutes() {
  const isLoggedIn = Authorization.isLoggedIn();
  const routing = useRoutes(routes(isLoggedIn));
  return routing;
}

function App() {

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
