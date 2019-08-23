import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import "./App.css";

import Landing from "./pages/Landingpage";
import Navbar from "./pages/navBar";
import Signup from './pages/register';
import Login from './pages/login';
import CreateForm from "./pages/Create";
import EditForm from "./pages/Edit";

function App() {
  return (

    <MuiThemeProvider theme={theme}> 
       
      <BrowserRouter>

          <Route exact path="/" component={Landing} />
          <Route path="/" component={Navbar} /> 
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route exact path="/create" component={CreateForm} />
          <Route path="/edit" component={EditForm} />

      </BrowserRouter>
      
    </MuiThemeProvider>
  );
}

export default App;

