import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./libContext";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <DarkModeContextProvider>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
      </DarkModeContextProvider>
    </AppProvider>
  </React.StrictMode>
);