import React, { useState } from "react";
import {
  Typography,
  makeStyles,
  Grid,
  Select,
  TextField,
  MenuItem,
  InputAdornment,
  Button
} from "@material-ui/core";
import classNames from "classnames";
import FileUpload from "../components/FileUpload";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
    paddingLeft: "20px"
  },
  select: {
    marginBottom: theme.spacing(3),
    minWidth: 415,
    maxWidth: 700
  },
  textField: {
    marginBottom: theme.spacing(3),
    minWidth: 415,
    maxWidth: 700
  },
  emphasis: {
    border: "none",
    width: "80px",
    borderRadius: "5px",
    borderTop: "5px solid #69E781"
  },
  button: {
    backgroundColor: "#69E781",
    margin: theme.spacing(2, 0, 2),
    color: "white",
    maxWdith: "200px",
    width: "200px"
  },
  leftSection: {
    paddingTop: theme.spacing(5),
    paddingLeft: "20px",
    borderRight: "10px solid",
    borderImage: "linear-gradient(to right, #CCCCCC, rgba(0, 0, 0, 0)) 1 100%;",
    borderRightLength: "50px"
  },
  displayTitle: {
    wordWrap: "break-word",
    paddingRight: "20px"
  },
  listItemActive: {
    padding: "20px",
    borderTop: "1px solid #CCCCCC",
    borderBottom: "1px solid #CCCCCC",
    color: "#69E781"
  },
  listItemActiveText: {
    color: "black"
  },
  listItemUnactive: {
    padding: "20px",
    borderTop: "1px solid #CCCCCC",
    borderBottom: "1px solid #CCCCCC",
    color: "#CCCCCC"
  },
  list: {
    paddingTop: "20px"
  }
}));

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

function LaunchDetails(props) {
  const classes = useStyles();
  const [project, setProject] = useState({
    ...props.location.state,
    title: "",
    subtitle: "",
    fundingGoal: "",
    images: ""
  });

  const onChangeSelect = event => {
    const { value, name } = event.target;
    if (name === "description") {
      if (value.length < 501) {
        setProject({ ...project, [name]: value });
      }
    } else if (name === "title" || name === "subtitle") {
      if (value.length < 101) {
        setProject({ ...project, [name]: value });
      }
    } else setProject({ ...project, [name]: value });
  };

  const handleFundingChange = name => event => {
    if (/^[0-9]*[\.]{0,1}[0-9]{0,2}$/.test(event.target.value)) {
      setProject({
        ...project,
        [name]: event.target.value
      });
    }
  };

  return (
    <div>
      <Grid container>
        <Grid className={classNames(classes.leftSection)} xs={4}>
          <Typography
            className={classNames(classes.displayTitle)}
            gutterBottom
            variant="h6"
          >
            {project.title ? project.title : "Project Title"}
          </Typography>

          {/* Preview Button */}
          <Button
            className={classes.button}
            type="button"
            variant="contained"
            type="button"
            onClick={() => {
              alert("Preview showing...");
            }}
          >
            Preview
          </Button>
          <ul className={classes.list}>
            <li className={classes.listItemActive}>
              <div className={classes.listItemActiveText}>BASICS</div>
            </li>
            <li className={classes.listItemUnactive}>REWARDS</li>
            <li className={classes.listItemUnactive}>STORY</li>
            <li className={classes.listItemUnactive}>PEOPLE</li>
            <li className={classes.listItemUnactive}>PAYMENT</li>
          </ul>
        </Grid>
        <Grid
          xs={8}
          className={classNames(classes.container)}
          container
          direction="column"
          justify="left"
          alignItems="left"
        >
          <Typography
            className={classNames(classes.title)}
            gutterBottom
            variant="h4"
          >
            Start with the basics
          </Typography>

          {/* Title Selector */}
          <TextField
            onChange={onChangeSelect}
            value={project.title}
            name="title"
            multiline
            variant="outlined"
            label="PROJECT TITLE"
            className={classNames(classes.fieldMargin, classes.textField)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {project.title.length}/100
                </InputAdornment>
              )
            }}
          />

          {/* Subtitle Selector */}
          <TextField
            onChange={onChangeSelect}
            value={project.subtitle}
            name="subtitle"
            multiline
            variant="outlined"
            label="PROJECT SUBTITLE"
            className={classNames(classes.fieldMargin, classes.textField)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {project.subtitle.length}/100
                </InputAdornment>
              )
            }}
          />

          {/* Description textfield */}
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

          {/* Industry Selector */}
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

          {/* Location Selector */}
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

          {/* Funding Goal Amount Selector */}
          <TextField
            variant="outlined"
            margin="normal"
            className={classNames(classes.select)}
            label="FUNDING GOAL"
            value={project.fundingGoal}
            onChange={handleFundingChange("fundingGoal")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />

          {/* Images Selector */}
          <Typography gutterBottom variant="subtitle2">
            Project Images
          </Typography>
          <FileUpload fileNumber={5} />

          {/* Submit Button */}
          <Button
            className={classes.button}
            type="button"
            variant="contained"
            type="button"
            onClick={() => {
              alert("Submitting project...");
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default LaunchDetails;
