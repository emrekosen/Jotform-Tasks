import React from "react";
import { Route, Redirect } from "react-router-dom";
import LoginPage from "./LoginPage";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const localUser = localStorage.getItem("user");
  return (
    <Route
      {...rest}
      render={props => {
        if (localUser != null) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/error" />;
        }
      }}
    />
  );
}
