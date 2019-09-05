import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import Fields from "./Fields";
import ProjectList from "./Project";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import JHAvatar from "../assets/jh-avatar.jpg";
import coffeeCup from "../assets/coffee-cup.jpg";
import espresso from "../assets/espresso.jpg";
import espresso2 from "../assets/espresso2.jpg";
import pouringCoffee from "../assets/pouring-coffee.jpg";
import "./Profile.css";


const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },

  projectTitle: {
    padding: 20
  },
  projectGridList: {
    padding: 20
  }
});

//const fieldsData = ["TECHNOLOGY", "COFFEE", "CUSTOMER SERVICE", "RESTAURANT"];

const projectData = [
  {
    img: coffeeCup,
    alt: "Coffee Cup",
    field: "Customer Service",
    title: "Urban Jungle: eco-friendly coffee shop",
    raised: "23,874",
    goal: "40,000",
    equity: "10%",
    daysToGo: "44 days to go"
  },
  {
    img: espresso,
    alt: "Espresso",
    field: "Coffee",
    title: "Energy Run: the quickest coffee experience",
    raised: "7,257",
    goal: "12,383",
    equity: "13%",
    daysToGo: "19"
  },
  {
    img: pouringCoffee,
    alt: "Pouring Coffee",
    field: "Restaurant",
    title: "Energy Rush: an even quicker coffee experience",
    raised: "34,912",
    goal: "50,000",
    equity: "5%",
    daysToGo: "5"
  }
];
*/

export default function ProfilePage(props) {
  const [profile, setProfile] = useState(""); //Replaced initial state from null to '' b/c it was
  const [projects, setProjects] = useState("");

  useEffect(() => {
    //fetch(`/profile/${props.match.params.id}`)
    fetch(`${props.location.pathname}`) // ** URL is equivalent to /profile/:id
      .then(res => {
        const response = res.json();
        if (res.status > 499) throw Error("Server error");
        else return response;
      })
      .then(res => {
        // console.log(res);
        // console.log(res.profile);
        // console.log(res.projects);

        setProfile(res.profile);
        setProjects(res.projects);
        if (res.status > 299) throw Error(res.message);
        // else return { setProfile, setProjects };
      })
      .catch(err => console.log(err));
  }, [props.location, props.match]);

  //console.log(profile.name);
  //console.log(projects);
  //console.log(profile.expertise);

  const fieldsData = profile.expertise;
  console.log(fieldsData);

  const classes = useStyles();


function EditDialog() {

  const [open, setOpen] = useState(false);
  function handleOpenClick() {
    setOpen(true);
  };
  function handleCloseClick() {
    setOpen(false);
  };

  return(
    <div>
      <Button onClick={handleOpenClick} variant="outlined">Edit info</Button>
      <Dialog open={open} close={handleCloseClick}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
           
          <Grid item xs={12} justify="center" className={"flex-col-scroll"}>
          <Grid container direction="column" spacing={3}>
            <Grid container justify="center" alignItems="center">
              <Avatar alt="James Hampton"  src={JHAvatar} />
            </Grid>

            <Grid container justify="center" alignItems="center" className="full-name">
              <Typography variant="h4" gutterBottom>
                James Hampton
              </Typography>
            </Grid>

          
            <Grid container justify="center" alignItems="center" > 
              <Typography variant="body2" color="textSecondary" gutterBottom >
                <LocationOnIcon/>
                Toronto, Canada
              </Typography>
            </Grid>

            <Grid item >
              <EditDialog />
            </Grid>

            <Fields fieldsData={fieldsData} />
            
            <Grid container justify="center" >
              <Button variant="outlined" >
                Send Message
              </Button>
            </Grid>
            </Grid>
            </Grid>

          </DialogContentText>
          <DialogActions>
            <Button onClick={handleCloseClick}>Submit Changes</Button>
          </DialogActions>
        </DialogContent>
    
      </Dialog>
    </div>
  )

};


export default function ProfilePage() {
  const classes = useStyles()

  return (
    //set up a condition to render only if profile and project isn't null
    <React.Fragment>

      <Grid container spacing={2} className="flexsection" style={{marginTop: '80px'}}>

        {/* Left part */}
        <Grid item xs={2} justify="center" className={"flex-col-scroll"}>
          <Grid container direction="column" spacing={3}>
            <Grid container justify="center" alignItems="center">
              <Avatar alt="James Hampton" src={JHAvatar} className={classes.bigAvatar} />
            </Grid>

            <Grid container justify="center" alignItems="center" className="full-name">
              <Typography variant="h4" gutterBottom>
                {profile.name}
              </Typography>
            </Grid>

            <Grid container justify="center" alignItems="center" className={classes.location}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <LocationOnIcon />
                {profile.location}

              </Typography>
            </Grid>

            <Grid item >
              <EditDialog />
            </Grid>

            <Fields fieldsData={fieldsData} />

            <Grid container justify="center" alignItems="center">

              <Button variant="outlined" className={classes.messageButton}>
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Right part*/}
        <Grid item xs={9} className={"flex-col-scroll"}>
          <Typography variant="h3" gutterBottom className={classes.projectTitle}>
            Projects
          </Typography>
          <ProjectList projectData={projects} /> {/*the prop would be changed with projects state */}
          <h1>Column 2</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>end line</h1>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
