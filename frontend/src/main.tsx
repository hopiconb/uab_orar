// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { MyContextProvider } from "./AppContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MyContextProvider>
      <Router>
        <App />
      </Router>
    </MyContextProvider>
  </StrictMode>
);
