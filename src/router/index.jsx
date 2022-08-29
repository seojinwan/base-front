import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import BasicSpinner from "components/spinner/basicSpinner";
import AuthGuard from "guards/authGuard";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<BasicSpinner />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Routers(props) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Main />
          </AuthGuard>
        }
      ></Route>
    </Routes>
  );
}

const Main = Loadable(lazy(() => import("../pages/main")));
