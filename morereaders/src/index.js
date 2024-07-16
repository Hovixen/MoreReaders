import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
const defaultTheme = createTheme();

root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <DarkModeContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </DarkModeContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);