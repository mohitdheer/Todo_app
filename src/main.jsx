import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { TodoProvider } from "./context/TodoContext.jsx";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header.jsx";
import("preline");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoProvider>
      <BrowserRouter>
        <Header />
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </TodoProvider>
  </React.StrictMode>
);
