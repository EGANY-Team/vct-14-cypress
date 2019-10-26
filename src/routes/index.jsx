import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { HomePage, LoginPage } from "../pages";

// requires authentication
const PrivateRoute = ({ path, auth, page: Component, ...otherProps }) => {
  if (auth)
    return (
      <Route path={path}>
        <Component auth={auth} {...otherProps} />
      </Route>
    );
  return <Redirect to="/login" />;
};

// unauthenticated routes (redirect to home when authenticated)
const CommonRoute = ({ path, auth, page: Component, ...otherProps }) => {
  if (!auth)
    return (
      <Route path={path}>
        <Component {...otherProps} />
      </Route>
    );
  return <Redirect to="/" />;
};

const Routes = ({ auth, setAuth }) => {
  return (
    <Switch>
      <CommonRoute
        path="/login"
        page={LoginPage}
        auth={auth}
        setAuth={setAuth}
      />
      <PrivateRoute path="/" page={HomePage} auth={auth} />
    </Switch>
  );
};

export default Routes;
