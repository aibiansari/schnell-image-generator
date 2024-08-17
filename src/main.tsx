import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster
      position="top-center"
      richColors
      toastOptions={{
        style: {
          background: "#d9d9d9",
          padding: "12px",
          paddingLeft: "24px",
        },
      }}
    />
    <App />
  </StrictMode>
);
