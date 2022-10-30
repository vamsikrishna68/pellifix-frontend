import React from "react";
import { Route } from "react-router-dom";

class Application extends React.Component {
  render() {
    const { element: Element, isLoggedIn, auth, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) => {
          return (
            <React.Fragment>
              {isLoggedIn() ? (
                <Element isLoggedIn={isLoggedIn} auth={auth} {...props} />
              ) : (
                <Element isLoggedIn={isLoggedIn} auth={auth} {...props} />
              )}
            </React.Fragment>
          );
        }}
      />
    );
  }
}

export default Application;
