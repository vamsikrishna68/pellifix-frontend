import React from "react";
import { Route, Navigate } from "react-router-dom";
import Authorization from "../utils/authorization";
import Application from "../rotues/Application";

/**
 * If we have a logged-in user, redirect to the home page. Otherwise, display the component.
 */
const PublicRoute = ({ element: Element, meta, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        if (Authorization.isLoggedIn()) {
          // redirect page based on user role
          return <Navigate to='/' />;
        }
        return (
          <Application
            {...props}
            isLoggedIn={Authorization.isLoggedIn}
            auth={Authorization}
            element={Element}
          />
        );
      }}
    />
  );
};

export default PublicRoute;
