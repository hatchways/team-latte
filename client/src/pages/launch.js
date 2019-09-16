import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Typography,
  makeStyles,
  Grid,
  Select,
  TextField,
  Checkbox,
  MenuItem,
  InputAdornment,
  Button
} from "@material-ui/core";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import theme from "../themes/theme";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5)
  },
  select: {
    marginBottom: theme.spacing(3),
    minWidth: 415
  },
  textField: {
    marginBottom: theme.spacing(3),
    minWidth: 415
  },
  emphasis: {
    border: "none",
    width: "80px",
    borderRadius: "5px",
    borderTop: "5px solid",
    borderColor: theme.palette.primary.main
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(2, 0, 2),
    color: "white"
  }
}));

const CustomCheckbox = withStyles({
  root: {
    colorPrimary: theme.palette.primary.main,
    "&$checked": {
      colorPrimary: theme.palette.primary.main
    }
  },
  checked: {}
})(props => <Checkbox color="primary" {...props} />);

const locationList = [
  "Toronto, Ontario",
  "NYC, New York",
  "Paris, France",
  "Warsaw, Poland",
  "London, England",
  "Tokyo, Japan",
  "Berlin, Germany"
];

const industryList = ["Crafts", "Attire", "Food", "Photography", "Music"];

function Launch() {
  const classes = useStyles();

  const [project, setProject] = useState({
    description: "",
    industry: "",
    location: ""
  });

  const [verified, setVerified] = useState({
    is18: false,
    hasID: false,
    hasBankCard: false
  });

  const onChangeSelect = event => {
    const { value, name } = event.target;
    if (name === "description") {
      if (value.length < 501) {
        setProject({ ...project, [name]: value });
      }
    } else setProject({ ...project, [name]: value });
  };

  const DataButton = withRouter(({ history }) => (
    <Button
      className={classes.button}
      type="button"
      variant="contained"
      size="large"
      onClick={() => {
        const { industry, description, location } = project;
        const { is18, hasID, hasBankCard } = verified;
        if (
          industry &&
          description &&
          location &&
          is18 &&
          hasID &&
          hasBankCard
        ) {
          history.push({ pathname: "/launchDetails", state: project });
        } else {
          console.log("error");
        }
      }}
    >
      Continue
    </Button>
  ));

  return (
    <div>
      <Grid
        className={classNames(classes.container)}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography
          className={classNames(classes.title)}
          gutterBottom
          variant="h4"
        >
          Let's get started.
        </Typography>
        <hr className={classNames(classes.emphasis)} />
        <Typography gutterBottom variant="subtitle2">
          Pick a project industry to connect with a community.
          <br />
          You can always update this later.
        </Typography>
        <Select
          children
          name="industry"
          value={project.industry}
          onChange={onChangeSelect}
          className={classNames(classes.select)}
          variant="outlined"
          input={
            <TextField
              variant="outlined"
              margin="normal"
              label="SELECT INDUSTRY"
            />
          }
        >
          <MenuItem value={""}>{}</MenuItem>
          {industryList.map(industry => (
            <MenuItem key={industry} value={industry}>
              {industry}
            </MenuItem>
          ))}
        </Select>
        <Typography gutterBottom variant="subtitle2">
          Describe what you will be creating.
        </Typography>
        <Grid item xs={12}>
          <TextField
            onChange={onChangeSelect}
            value={project.description}
            name="description"
            multiline
            rows="4"
            variant="outlined"
            label="DESCRIPTION"
            className={classNames(classes.fieldMargin, classes.textField)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {project.description.length}/500
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Typography gutterBottom variant="subtitle2">
          Tell us where you're based and confirm a few other details before we
          proceed.
        </Typography>
        <Grid item xs={12}>
          <Select
            children
            name="location"
            value={project.location}
            onChange={onChangeSelect}
            className={classNames(classes.select)}
            variant="outlined"
            input={
              <TextField
                variant="outlined"
                margin="normal"
                label="SELECT YOUR LOCATION"
              />
            }
          >
            <MenuItem value={""}>{}</MenuItem>
            {locationList.map(location => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}>
            <FormControlLabel
              control={<CustomCheckbox />}
              label="I'm at least 18 years old."
              onChange={() =>
                setVerified({ ...verified, is18: !verified.is18 })
              }
            />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}>
            <FormControlLabel
              control={<CustomCheckbox />}
              label="I can verify a bank account and goverment-issued ID"
              onChange={() =>
                setVerified({ ...verified, hasID: !verified.hasID })
              }
            />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}>
            <FormControlLabel
              control={<CustomCheckbox value />}
              label="I have a debit and/or credit card."
              onChange={() =>
                setVerified({ ...verified, hasBankCard: !verified.hasBankCard })
              }
            />
          </Grid>
        </Grid>
        <DataButton>Submit</DataButton>
      </Grid>
    </div>
  );
}

export default Launch;
