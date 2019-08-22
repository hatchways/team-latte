import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import Navbar from "./pages/navBar"
import Signup from './pages/register'
import Login from './pages/login'

import "./App.css";
import Landing from "./pages/Landingpage";


function App() {
  return (

    <MuiThemeProvider theme={theme}> 
       
      <BrowserRouter>
          <Route exact path="/" component={Landing} />
          <Route path="/" component={Navbar} /> 
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
      </BrowserRouter>
      
    </MuiThemeProvider>
  );
}

export default App;

