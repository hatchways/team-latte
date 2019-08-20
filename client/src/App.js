import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
//import theme from "./themes/theme";
//import LandingPage from "./pages/Landing";
import NewMemberInfo from './pages/register'
import Login from './pages/login'

import "./App.css";
import Landing from "./pages/Landingpage";

function App() {
  return (
    <MuiThemeProvider>
    
      <BrowserRouter>

        <Route exact path="/" component={Landing} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={NewMemberInfo} />
        
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

