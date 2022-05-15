import React from 'react'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Login from "./pages/Login/Login";
import Welcome from "./pages/Welcome/Welcome"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';


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
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
