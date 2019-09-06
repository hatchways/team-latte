import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText, TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
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

const fieldsData = ["TECHNOLOGY", "COFFEE", "CUSTOMER SERVICE", "RESTAURANT"];
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

function EditDialog(props) {
  const profile = props.profile;
  //console.log(profile.name)
  const [name, setCurrentName] = useState("");
  const [location, setCurrentLocation] = useState("");
  const [open, setOpen] = useState(false);

  const modifyProfileInfo = profileInfo => {
    console.log(profileInfo);
   // fetch(`${props.location.pathname}`, {
     fetch(`/profile/${profile._id}` , {
       method: "PUT",
       headers: {
        Authorization: `Bearer ${sessionStorage.getItem("AuthToken")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profileInfo)
    })
      .then(res => {
        const response = res.json();
        if (res.status > 499) throw Error("Server error");
        else return response;
      })
       .then(res => {
        console.log(res.profile)
        if (res.status > 299) throw Error(res.message + "");
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const updatedInfo = {
      name,
      location
    };
    console.log("test");
    // console.log(JSON.stringify(updatedInfo));
    console.log(updatedInfo)
    modifyProfileInfo(updatedInfo);

    handleCloseClick();
  };

  function handleOpenClick() {
    setOpen(true);
  }
  function handleCloseClick() {
    setOpen(false);
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <Button onClick={handleOpenClick} variant="outlined">
        Edit info
      </Button>
      <Dialog
        open={open}
        close={handleCloseClick}
        onBackdropClick={handleCloseClick}
        onEscapeKeyDown={handleCloseClick}
        fullWidth
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent dividers>
          <DialogContentText style={{ border: "2px solid red" }}>
            <Grid container xs={12} justify="center">
              <Grid container justify="center" alignItems="center">
                <Avatar alt="James Hampton" src={JHAvatar} className={classes.bigAvatar} />
              </Grid>

              <Grid container justify="center" alignItems="center" className="full-name">
                <TextField
                  type="text"
                  name="name"
                  id="name"
                  margin="normal"
                  variant="standard"
                  label="Name"
                  value={profile.name}
                  onChange={e => setCurrentName(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              <Grid container justify="center" alignItems="center" className="full-name">
                <TextField
                  type="text"
                  name="location"
                  id="location"
                  margin="normal"
                  variant="standard"
                  label="Location"
                  value={location}
                  onChange={e => setCurrentLocation(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              <Grid container justify="center" alignItems="center">
                <TextField type="text" value={fieldsData} />
              </Grid>
            </Grid>
          </DialogContentText>

          <DialogActions>
            <Button onClick={handleSubmit}>Submit Changes</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

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
        console.log(res.profile.params);
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
  console.log(profile);

  const classes = useStyles();

  return (
    //set up a condition to render only if profile and project isn't null
    <React.Fragment>
      <Grid container justify="center" spacing={3} style={{ marginTop: "80px" }}>
        {/* Left part */}
        <Grid item xs={3} style={{ border: "2px solid red", minHeight: "200px" }}>
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

            <Grid container justify="center">
              <EditDialog profile={profile} />
            </Grid>

            <Grid container justify="center" alignItems="center">
              <Fields fieldsData={fieldsData} />
            </Grid>

            <Grid container justify="center" alignItems="center">
              <Button variant="outlined" className={classes.messageButton}>
                Send Message
              </Button>

              {/*Add another dialog box for messaging feature - low priority */}
            </Grid>
          </Grid>
        </Grid>

        {/* Right part*/}
        <Grid item xs={8} style={{ border: "2px solid red" }}>
          <Typography variant="h3" gutterBottom className={classes.projectTitle}>
            Projects
          </Typography>
          <ProjectList projectData={projectData} /> {/*the prop would be changed with projects state */}
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
