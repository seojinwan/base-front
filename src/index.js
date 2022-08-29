import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import { HelmetProvider } from "react-helmet-async";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </HelmetProvider>
);
