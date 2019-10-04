import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { theme } from "./themes/theme";
import "./App.css";
import Navbar from "./pages/navBar";
import Signup from "./pages/register";
import Login from "./pages/login";
import CreateForm from "./pages/Create";
import EditForm from "./pages/Edit";
import Explore from "./pages/explore";
import Launch from "./pages/launch";
import ProfilePage from "./pages/Profile";
import DetailProjectView from "./pages/DetailedProjectView"
import LaunchDetails from "./pages/launchdetails";


const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        window.sessionStorage.getItem("AuthToken") ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <ProtectedRoute exact path="/" component={ProfilePage} />
        <Route path="/" component={Navbar} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile/:id" component={ProfilePage} />
        <Route path="/create" component={CreateForm} />
        <ProtectedRoute path="/edit" component={EditForm} />
        <Route path="/explore" component={Explore} />
        <Route path="/launch" component={Launch} />
        <Route path="/launchDetails" component={LaunchDetails} />

      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
