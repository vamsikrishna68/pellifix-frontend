import React from 'react'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Login from "./pages/Login/Login";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';


let theme = createTheme({
  palette: {
    primary: {
      main: '#303e47',
    },
    secondary: {
      main: '#ff4500',
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
