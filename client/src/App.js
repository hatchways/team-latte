import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { theme } from "./themes/theme";
import "./App.css";
import Landing from "./pages/Landingpage";
import Navbar from "./pages/navBar";
import Signup from "./pages/register";
import Login from "./pages/login";
import CreateForm from "./pages/Create";
import EditForm from "./pages/Edit";
import Explore from "./pages/explore";
import Launch from "./pages/launch";
import ProfilePage from "./pages/Profile";


const ProtectedRoute = ({component: Component, ...rest }) =>(
  <Route {...rest} render={(props) => (
    (window.sessionStorage.getItem('AuthToken'))
    ? <Component {...props} />
    : <Redirect to='/login'/>
  )} />
)


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>

          <Route exact path="/" component={Landing} />
          <Route path="/" component={Navbar} /> 
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
           <Route path="/profile/:id" component={ProfilePage} />
        {/* <Route path="/profile" component={ProfilePage} /> */}
          <Route path="/create" component={CreateForm} />
          <ProtectedRoute path="/edit" component={EditForm} />
          <Route path="/explore" component={Explore} />
          <Route path="/launch" component={Launch} />
    
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
