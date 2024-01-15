import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SystemsProvider } from "./SystemsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <SystemsProvider>
            <App />
        </SystemsProvider>
    </React.StrictMode>
);
