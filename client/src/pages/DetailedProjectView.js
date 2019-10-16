import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  Chip,
  Grid,
  Card,
  CardMedia,
  Tabs,
  Tab,
  Avatar,
  InputAdornment,
  CardContent,
  Divider,
  Box,
  LinearProgress
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import { fieldsStyle } from "./Fields";
import classNames from "classnames";
import authFetch from "../utilities/auth";

import coffeeCup from "../assets/coffee-cup.jpg";
import { lighten } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import theme from "../themes/theme";

const useStyles = makeStyles(createTheme => ({
  fundDialog: {
    padding: 20
  }
}));

const detailedView = makeStyles({
  dialogSize: {
    //height: "1600px",
    //  border: "2px solid red"
  },
  dialogTitle: {
    alignItems: "center",
    textAlign: "center"
  },
  chipPosition: {
    marginBottom: 20
  },
  media: {
    height: 320
  },
  leftCard: {
    width: "100%"
    // borderRadius: '0px',
  },
  tabBox: {
    flexGrow: 1,
    border: "2px solid red",
    justifyContent: "center"
  },
  bothCards: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  rightCard: {
    margin: theme.spacing(3)
  },
  authorInfo: {
    flexDirection: "column",
    margin: 10
  },
  countdown: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10
  },
  countdownBox: {
    borderTop: "2px solid rgba(0,0,0,0.1)",
    // borderRight: "1px solid rgba(0,0,0,0.5)",
    borderBottom: "2px solid rgba(0,0,0,0.1)",
    padding: "20px",
    alignItems: "stretch",
    textAlign: "center",
    flexGrow: 1
  },
  buttons: {
    flexDirection: "column"
  },
  fundButton: {
    backgroundColor: "#69E781",
    margin: theme.spacing(2, 0, 2),
    color: "white"
  }
});

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten(green[300], 0.5),
    borderRadius: 5,
    margin: theme.spacing(3)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "rgb(79 199 116)"
  }
})(LinearProgress);

const project = {
  category: "Life Hacks",
  alt: "Pouring Coffee",
  industry: "Restaurant",
  title: "Energy Rush: an even quicker coffee experience",
  raised: "34,912",
  goal: "50,000",
  equity: "5%",
  daysToGo: "5",
  author: "Jerry",
  location: "NYC, NY",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  images: "...",
  summaryPoints: ["Lower Expenses", "Feature 2", "Feature 3"],
  teamMembers: [
    {
      name: "Person A",
      image: { coffeeCup }
    },
    {
      name: "Person B",
      image: { coffeeCup }
    }
  ]
};

function FundDialog(props) {
  const classes = useStyles();
  const [amount, setAmount] = useState("");

  const handleAmountChange = event => {
    console.log(props.projectID);
    if (/^([1-9][0-9]*[\.]{0,1}[0-9]{0,2})?$/.test(event.target.value)) {
      setAmount(event.target.value);
    }
  };
  const handleInvestSubmit = () => {
    console.log("hello");
    authFetch({
      url: "/invest",
      method: "POST",
      body: JSON.stringify({
        projectID: props.projectID,
        amount: amount
      })
    }).then(res => {
      if (res.error) {
        alert("ERROR");
      } else {
        console.log("/profile/" + sessionStorage.getItem("user")._id);
      }
    });
  };

  return (
    <div>
      <Dialog
        open={props.fundDialog}
        onClose={() => props.setFundDialog(false)}
        maxWidth="md"
      >
        <div className={classNames(classes.fundDialog)}>
          <Typography variant="body2">
            Please enter the dollar amount you wish to invest to the project.
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            className={classNames(classes.select)}
            label="Amount to invest"
            value={amount}
            onChange={handleAmountChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
          <br />
          <Button variant="outlined" onClick={handleInvestSubmit}>
            Submit Investment
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

function DetailedProjectView(props) {
  const classes = detailedView();
  const fieldsClasses = fieldsStyle();
  const [fundDialog, setFundDialog] = useState(false);

  const project = props.project;
  //console.log(projects);

  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const raisedAmount = (project.raised_amount / project.funding_goal) * 100;

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.clickClose}
        className={classes.dialogSize}
        maxWidth="lg"
      >
        <Grid>
          <DialogTitle className={classes.dialogTitle}>
            <Chip
              label={project.industry}
              color="primary"
              className={classNames(
                fieldsClasses.field,
                fieldsClasses.chip,
                classes.chipPosition
              )}
            />
            <Typography variant="h5" color="textPrimary">
              {project.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {project.subtitle
                ? project.subtitle
                : "Our to-be-investors are too busy to read subtitles anyway..."}
            </Typography>
          </DialogTitle>
        </Grid>

        <Grid xs="12" className={classNames(classes.bothCards)}>
          <DialogContent>
            <Grid container spacing="5">
              {/* Left card */}
              <Grid container xs="8">
                <Card className={classes.leftCard}>
                  <CardContent>
                    <Grid item xs="12">
                      <CardMedia
                        image={coffeeCup}
                        component="img"
                        alt={project.title}
                        className={classes.media}
                      />
                      {/*How can we specify which uploaded photo be used for the card pic? */}
                    </Grid>
                    <Grid item xs="12" wrap="wrap">
                      <Tabs
                        value={value}
                        onChange={handleTabChange}
                        style={{ borderBottom: "2px solid black" }}
                        variant="scrollable"
                      >
                        <Tab label="About" />
                        <Tab label="Team" />
                        <Tab label="Market Size" />
                        <Tab label="Traction" />
                        <Tab label="Goals" />
                        <Tab label="Investment" />
                      </Tabs>
                    </Grid>
                    <Grid>
                      {value === 0 && (
                        <Typography>{project.description}</Typography>
                      )}
                      {value === 1 && (
                        <Typography>
                          {project.description.substring(0, 100)}
                        </Typography>
                      )}
                      {value === 2 && (
                        <Typography>
                          {project.description.substring(0, 50)}
                        </Typography>
                      )}
                      {value === 3 && (
                        <Typography>
                          {project.description.substring(0, 150)}
                        </Typography>
                      )}
                      {value === 4 && (
                        <Typography>
                          {project.description.substring(0, 70)}
                        </Typography>
                      )}
                      {value === 5 && (
                        <Typography>
                          {project.description.substring(0, 200)}
                        </Typography>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Right card */}
              <Grid container xs="4" direction="column">
                <Card>
                  <CardContent>
                    <Grid
                      container
                      className={classNames(classes.rightCard)}
                      justify="center"
                      alignItems="center"
                    >
                      <Typography variant="h4">
                        ${project.raised_amount}
                      </Typography>
                      <Typography variant="body2" style={{ color: "gray" }}>
                        {" "}
                        / ${project.funding_goal}
                      </Typography>
                    </Grid>

                    <Grid justify="center" alignItems="center">
                      <BorderLinearProgress
                        variant="determinate"
                        value={raisedAmount}
                      />
                    </Grid>

                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      style={{ marginBottom: "10px" }}
                    >
                      <Typography>
                        Equity Exchange: {project.equity}%
                      </Typography>
                    </Grid>

                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      className={classNames(classes.countdown)}
                    >
                      <Grid
                        item
                        justify="center"
                        alignContent="stretch"
                        className={classNames(classes.countdownBox)}
                      >
                        <Typography variant="h6">82</Typography>
                        <Typography variant="body2" color="textSecondary">
                          backers
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        justify="center"
                        alignItems="center"
                        className={classNames(classes.countdownBox)}
                      >
                        <Typography variant="h6">44</Typography>
                        <Typography variant="body2" color="textSecondary">
                          days to go
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      className={classNames(classes.authorInfo)}
                    >
                      <Avatar src={coffeeCup} size />
                      <Typography variant="p2">{project.author}</Typography>
                      <Typography variant="p2" color="textSecondary">
                        {project.location}
                      </Typography>
                    </Grid>

                    <DialogActions>
                      <Grid container className={classNames(classes.button)}>
                        <Button variant="outlined" fullWidth>
                          Send Message
                        </Button>
                        <Button
                          onClick={() => setFundDialog(true)}
                          className={classNames(classes.fundButton)}
                          fullWidth
                        >
                          Fund This Project
                        </Button>
                      </Grid>
                    </DialogActions>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </DialogContent>
        </Grid>
      </Dialog>
      <FundDialog
        fundDialog={fundDialog}
        setFundDialog={setFundDialog}
        projectID={project._id}
      />
    </div>
  );
}

export default DetailedProjectView;
