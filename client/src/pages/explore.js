import React, { useEffect, useState } from "react";
import { Typography, makeStyles, Grid, Select, TextField, MenuItem } from "@material-ui/core";
import classNames from "classnames";
import coffeeCup from "../assets/coffee-cup.jpg";
import espresso from "../assets/espresso.jpg";
import pouringCoffee from "../assets/pouring-coffee.jpg";
import ProjectList from "./Project";
import authFetch from "../utilities/auth";

import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns/build";
import MomentUtils from "@date-io/moment";
var moment = require("moment");

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
    textAlign: "center"
  },

  fieldMargin: {
    margin: theme.spacing(2)
  },

  select: {
    minWidth: 215
  },
  flexContainer: {
    display: "flex",
    margin: "40px 10%"
  }
}));

const mockProjectData = [
  {
    deadline: "Tue Oct 22 2019",
    img: coffeeCup,
    category: "Food and Craft",
    alt: "Coffee Cup",
    industry: "Tester Industry",
    title: "Urban Jungle: eco-friendly coffee shop",
    raised: "23,874",
    goal: "40,000",
    equity: "10%",
    daysToGo: "44",
    author: "John Snow",
    location: "Pripyat, Ukraine"
  },
  {
    deadline: "Tue Oct 22 2019",
    img: espresso,
    category: "Food and Craft",
    alt: "Espresso",
    industry: "Coffee",
    title: "Energy Run: the quickest coffee experience",
    raised: "7,257",
    goal: "12,383",
    equity: "13%",
    daysToGo: "19",
    author: "Jerry",
    location: "NYC, NY"
  },
  {
    deadline: "Wed Oct 23 2019",
    img: pouringCoffee,
    category: "Life Hacks",
    alt: "Pouring Coffee",
    industry: "Restaurant",
    title: "Energy Rush: an even quicker coffee experience",
    raised: "34,912",
    goal: "50,000",
    equity: "5%",
    daysToGo: "5",
    author: "Jerry",
    location: "NYC, NY"
  },
  {
    deadline: "Fri Oct 25 2019",
    img: pouringCoffee,
    category: "Life Hacks",
    alt: "Pouring Coffee",
    industry: "Restaurant",
    title: "Energy Rush: an even quicker coffee experience",
    raised: "34,912",
    goal: "50,000",
    equity: "5%",
    daysToGo: "5",
    author: "Jerry",
    location: "NYC, NY"
  },
  {
    deadline: "Sun Oct 27 2019",
    img: pouringCoffee,
    category: "Life Hacks",
    alt: "Pouring Coffee",
    industry: "Restaurant",
    title: "Energy Rush: an even quicker coffee experience",
    raised: "34,912",
    goal: "50,000",
    equity: "5%",
    daysToGo: "5",
    author: "Jerry",
    location: "NYC, NY"
  }
];

function Explore() {
  const classes = useStyles();

  const [projects, setProjects] = useState([]); //initialize it with mock data for demo
  const [industries, setIndustries] = useState([]);

  const [filterQuery, setFilterQuery] = useState({
    industry: "",
    //deadline: new Date(),
    deadline: moment(),
    location: ""
  });
  console.log(filterQuery.deadline, typeof filterQuery.deadline);
  console.log(projects)

  // console.log(filterQuery.deadline)

  const onDeadline = event => {
    setFilterQuery({ ...filterQuery, deadline: moment(event)});
    //setFilterQuery({ ...filterQuery, deadline: Date(event) });
  };

  //It would be nice if this is run everytime the user hit the bottom of the page and fetches 20 new projects each time
  //look up 'react infinite scroll' for that
  useEffect(() => {
    /*
    fetch("/projects", {
      headers: {
        //TODO instead of setting to token here, create a wrapper fetch function called 'authFetch' that sets the headers with the token
        Authorization: `Bearer ${sessionStorage.getItem("AuthToken")}`
      }
    })
      .then(res => {
        //TODO verify status of request, catch errors
        return res.json();
      })
      .then(res => {
        setProjects(projects.concat(res.projects));
      });*/
    authFetch({
      url: "/projects"
    }).then(res => {
      if (res.error) {
        clearing();
      } else {
        const resJason = res.projects;
       // resJason.map(project => console.log(project))
       // console.log(isJsonString(resJason));
        console.log(typeof resJason[7].deadline);
        console.log(moment(resJason[4].deadline))
        setProjects(projects.concat(res.projects));
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //This loads the industries from projects
  useEffect(() => {
    const uniqueIndustries = new Set();

    projects.forEach(project => {
      //REMEMBER forEach is for arrays (for each element)

      uniqueIndustries.add(project.industry); //1. Adding each project's industry in the 'Set'
    });
    //console.log(setIndustries);
    setIndustries(Array.from(uniqueIndustries)); //2. Updating 'industry' state hook by forming an array (by iterating over an OBJECT) because the initial includes an empty array!!
  }, [projects]); //THIS MEANS if projects array changes, it will re-render

  const onChangeFilter = event => {
    //console.log(event)
    //console.log(event.target)

    //This is used in the Select element for industry... think 'event' for 'e'
    const { value, name } = event.target; // IOW, the 'event' (or 'e') is used to create an object of 2 props from the element that hosts the event... such as clicking on allows you to get the value and name which are parts of the <Select> element;
    // console.log(name, value)
    setFilterQuery({ ...filterQuery, [name]: value }); //This will add onto the filterQuery but replaces the key-pair value... IOW ['industry']: one of the options avalaible due to <MenuItem>
    //console.log(filterQuery)
  };

  const clearing = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.replace("/login");
  };

  const filterProjects = projects => {
    const { industry, location, deadline } = filterQuery;

   // const AfterDeadline = projects.filter(project => moment(project.deadline).from(filterQuery.deadline) >=  0 );
    
   //const AfterDeadline = projects.filter(project => moment(project.deadline) >= filterQuery.deadline); <<-- This assumes deadlines are integers such that they can be compared but the deaadlines either appear as strings or moments

    return (
      projects.filter(
        project => 
          project.industry.includes(industry) &&
          project.location.includes(location)
          // && project.deadline.includes(deadline)
        //  && moment(project.deadline).to(filterQuery.deadline) >= 0

        //Currently stuck on how to compare dates that are in an object, as part of moment
        
      )
    )
  }

  return (
    <div className={classes.container}>
      <Typography gutterBottom variant="h4">
        Explore projects
      </Typography>
      <Grid alignContent="center">
        <Select
          onChange={onChangeFilter}
          name="industry"
          value={filterQuery.industry}
          className={classNames(classes.select)}
          variant="outlined"
          input={<TextField variant="outlined" margin="normal" label="Industries" />}
        >
          <MenuItem value={""}>{}</MenuItem>
          {industries.map(industry => (
            <MenuItem value={industry}>{industry}</MenuItem>
          ))}
        </Select>
        <TextField
          onChange={onChangeFilter}
          value={filterQuery.location}
          name="location"
          className={classNames(classes.fieldMargin)}
          variant="outlined"
          margin="normal"
          label="Location"
        />
        {/*
        <TextField
          onChange={onChangeFilter}
          value={filterQuery.deadline}
          name="deadline"
          type="date"
          className={classes.fieldText}
          variant="outlined"
          margin="normal"
          label="Deadline"
        />
        */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Deadline"
            name="deadline"
            inputVariant="outlined"
            value={filterQuery.deadline}
            onChange={date => onDeadline(date)}
            //placeholder="___/___/______"
          />
        </MuiPickersUtilsProvider>
      </Grid>
      {projects && (
        <div className={classes.flexContainer}>
          <ProjectList withAuthor projectData={filterProjects(projects)} />
        </div>
      )}
    </div>
  );
}

export default Explore;
