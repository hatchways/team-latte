import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import Signup from './pages/register'
import Login from './pages/login'

import "./App.css";
import Landing from "./pages/Landingpage";

function App() {
  return (
    <MuiThemeProvider>
      <BrowserRouter>

        <Route exact path="/" component={Landing} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

