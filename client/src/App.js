import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";


import "./App.css";
import CreateForm from "./pages/Create";
import EditForm from "./pages/Edit"

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={CreateForm} />
        <Route path="/edit" component={EditForm} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
