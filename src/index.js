import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowerRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowerRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowerRouter>
    <App />
  </React.StrictMode>
);
