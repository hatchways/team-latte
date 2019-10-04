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

      <AppBar position="sticky">
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
                color: "black"
              }}
              style={{
                textDecoration: "none"
              }}
            >
              EXPLORE
            </NavLink>
          </Button>

          <Button className={classes.button}>
            <NavLink
              to="/launch"
              activeStyle={{
                color: "black"
              }}
              style={{
                textDecoration: "none"
              }}
            >
              LAUNCH
            </NavLink>
          </Button>

          <Button className={classes.button}>
            {window.sessionStorage.getItem("user") ? (
              <NavLink
                to={
                  "/profile/" +
                  JSON.parse(window.sessionStorage.getItem("user"))._id
                }
                activeStyle={{
                  color: "black"
                }}
                style={{
                  textDecoration: "none"
                }}
              >
                PROFILE
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                activeStyle={{
                  color: "black"
                }}
                style={{
                  textDecoration: "none"
                }}
              >
                LOGIN
              </NavLink>
            )}
          </Button>
        </div>
      </AppBar>
    </React.Fragment>
  );
}

export default NavBar;
