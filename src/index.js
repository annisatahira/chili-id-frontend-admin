import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import * as serviceWorker from "./serviceWorker";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import PrivateRoute from "components/PrivateRoute.jsx";
import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";
import Login from "./views/Login";

const hist = createBrowserHistory();

ReactDOM.render(
  <>
    <Router history={hist}>
      <Switch>
        {/* <PrivateRoute path="/app" render={props => <AdminLayout {...props} />} /> */}
        <Route path="/app" component={AdminLayout} />
        <Route path="/login" component={Login} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </Router>
    ,
    <ToastContainer
      position="top-center"
      autoClose={4000}
      hideProgressBar={true}
    />
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
