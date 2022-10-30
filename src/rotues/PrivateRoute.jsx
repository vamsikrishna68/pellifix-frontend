import React from "react";
import { Route, Navigate } from "react-router-dom";
import Authorization from "../utils/authorization";
import Application from "../rotues/Application";

/**
 * If we have a logged-in user, display the element, otherwise redirect to login page.
 */
const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        if (Authorization.isLoggedIn()) {
          return (
            <Application
              {...props}
              isLoggedIn={Authorization.isLoggedIn}
              auth={Authorization}
              element={Element}
            />
          );
        } else {
          sessionStorage.setItem("proute", JSON.stringify(props.location));
          return <Navigate to="/" />;
        }
      }}
    />
  );
};
export default PrivateRoute;
