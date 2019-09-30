import React, { Component } from "react";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
import authFetch from "../utilities/auth";

import Ping from "./Ping";

const landinPageStyle = theme => ({
  landingContainer: {
    margin: theme.spacing.unit * 2
  }
});

class LandingPage extends Component {
  state = {
    welcomeMessage: "Step 1: Run the server and refresh (not running)",
    step: 0
  };

  componentDidMount() {
    authFetch("/welcome").then(res => {
      if (res.error) {
        console.log(res.error);
      } else {
        this.setState({ welcomeMessage: res.welcomeMessage });
        this.incrementStep();
      }
    });
  }

  incrementStep = () => {
    this.setState(prevState => ({ step: (prevState.step += 1) }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landingContainer}>
        <Typography>{this.state.welcomeMessage}</Typography>
        {this.state.step >= 1 && (
          <React.Fragment>
            <Link to="/ping">Step 2: Click here </Link>
            <Route
              path="/ping"
              render={props => {
                return (
                  <Ping
                    {...props}
                    incrementStep={this.incrementStep}
                    step={this.state.step}
                  />
                );
              }}
            />
          </React.Fragment>
        )}
        {this.state.step >= 3 && (
          <Typography>All done! Now go make a pull request!</Typography>
        )}
      </div>
    );
  }
}

export default withStyles(landinPageStyle)(LandingPage);
