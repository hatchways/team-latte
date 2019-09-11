import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  TextField,
  Grid,
  Button,
  Avatar
} from "@material-ui/core";
import JHAvatar from "../assets/jh-avatar.jpg";

const useStyles = makeStyles({
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

export default function EditDialog(props) {
  //console.log(props.profile._id);
  const [profile, setProfile] = useState(props.profile);
  const [open, setOpen] = useState(false);

  const modifyProfileInfo = profileInfo => {
    //console.log(profileInfo);
    // fetch(`${props.location.pathname}`, {
    //console.log("/profile/" + props.profile._id);
    fetch("/profile/" + props.profile._id, {
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
        props.setProfile(res);
        if (res.status > 299) throw Error(res.message + "");
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const updatedInfo = profile;
    console.log(updatedInfo);

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
          <DialogContentText>
            <Grid container xs={12} alignContent="center" alignItems="center"  direction="column" style={{border: '2px solid red'}}>
              <Grid item style={{border: '2px solid red'}} >
                <Avatar alt="James Hampton" src={JHAvatar} className={classes.bigAvatar} />
    
                <TextField
                  type="text"
                  name="name"
                  id="name"
                  margin="normal"
                  variant="standard"
                  label="Name"
                  value={profile.name}
                  onChange={e => {
                    const val = e.target.value;
                    setProfile(prevState => {
                      return { ...prevState, name: val };
                    });
                  }}
                  fullWidth
                  required
                />
            
                <TextField
                  type="text"
                  name="location"
                  id="location"
                  margin="normal"
                  variant="standard"
                  label="Location"
                  value={profile.location}
                  onChange={e => {
                    const val = e.target.value;
                    setProfile(prevState => {
                      return { ...prevState, location: val };
                    });
                  }}
                  fullWidth
                  required
                />
             

              {/*  <Grid container justify="center" alignItems="center">
                <TextField type="text" value={fieldsData} />
              </Grid>
               */}
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