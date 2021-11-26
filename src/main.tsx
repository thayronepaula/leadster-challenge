import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";
import { App } from "./App";
import { SearchProvider } from "./context/search";

ReactDOM.render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
