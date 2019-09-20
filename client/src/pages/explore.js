import React, { useEffect, useState } from "react";
import { Typography, makeStyles, Grid, Select, TextField, MenuItem } from "@material-ui/core";
import classNames from "classnames";
import coffeeCup from "../assets/coffee-cup.jpg";
import espresso from "../assets/espresso.jpg";
import pouringCoffee from "../assets/pouring-coffee.jpg";
import ProjectList from "./Project";
import authFetch from "../utilities/auth";

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
    deadline: "2019-09-22",
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
    deadline: "2019-09-21",
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
    deadline: "2019-09-23",
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
    deadline: "2019-09-24",
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
    deadline: "2019-09-29",
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

  const [projects, setProjects] = useState(mockProjectData); //initialize it with mock data for demo
  const [industries, setIndustries] = useState([]);

  const [filterQuery, setFilterQuery] = useState({
    industry: "",
    location: "",
    deadline: ""
  });

  console.log(filterQuery.deadline);

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
    //This is used in the Select element for industry... think 'event' for 'e'
    const { value, name } = event.target; // IOW, the 'event' (or 'e') is used to create an object of 2 props from the element that hosts the event... such as clicking on allows you to get the value and name which are parts of the <Select> element;
    setFilterQuery({ ...filterQuery, [name]: value }); //This will add onto the filterQuery but replaces the key-pair value... IOW ['industry']: one of the options avalaible due to <MenuItem>


  const clearing = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.replace("/login");

  };


  const filterProjects = projects => {
    const { industry, location, deadline } = filterQuery; //TODO using deadline yet, it should the project timestamp and subtract dates


    const AfterDeadline = projects.filter(project => project.deadline >= filterQuery.deadline);
    //const BeforeDeadline = projects.filter(project => project.deadline < filterQuery.deadline);
  
    return projects.filter(
      project =>
        project.industry.includes(industry) && //checking if specific project's industry MATCHES the industry
        project.location.includes(location) &&
        project.deadline.includes(deadline)
    ) && AfterDeadline;

  };

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
