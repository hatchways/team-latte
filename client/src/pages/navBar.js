import React from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Typography,
  makeStyles,
  Avatar,
  CssBaseline,
  Button
} from "@material-ui/core";
import Launch from "../themes/ic-logo.png";

const NavBarStyles = makeStyles(theme => ({
  companyLogo: {
    // logo is
    height: 30,
    width: 30,
    borderRadius: "0"
  },

  separation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  rightButtons: {
    display: "flex",
    flexDirection: "row"
  },

  button: {
    margin: theme.spacing(0, 2, 0, 2),
    fontSize: 14,
    color: "black"
  }
}));

function NavBar() {
  const classes = NavBarStyles();
  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="sticky" style={{marginBottom: '10px'}}>
        <div className={classes.separation}>
          <Avatar
            className={classes.companyLogo}
            alt="Company Logo"
            src={Launch}
          />
          <Typography variant="h6" style={{ marginLeft: "10px" }}>
            Product Launch
          </Typography>
        </div>

        <div className={classes.rightButtons}>
          <Button className={classes.button}>
            <NavLink
              to="/explore"
              activeStyle={{
                textUnderlinePosition: "under",
                textDecorationColor: "#69E781",
                color: "black"
              }}
            >
              EXPLORE
            </NavLink>
          </Button>

          <Button className={classes.button}>
            <NavLink
              to="/launch"
              activeStyle={{
                textUnderlinePosition: "under",
                textDecorationColor: "#69E781",
                color: "black"
              }}
            >
              LAUNCH
            </NavLink>
          </Button>

          <Button className={classes.button}>
            <NavLink
              to="/login"
              activeStyle={{
                textUnderlinePosition: "under",
                textDecorationColor: "#69E781",
                color: "black"
              }}
            >
              LOGIN
            </NavLink>
          </Button>
        </div>
      </AppBar>
    </React.Fragment>
  );
}

export default NavBar;
