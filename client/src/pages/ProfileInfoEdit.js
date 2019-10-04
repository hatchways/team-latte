import React, { useState } from "react";
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
import authFetch from "../utilities/auth";
import FileUpload from "../components/FileUpload";

const useStyles = makeStyles({
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

export default function EditDialog(props) {
  const [files, setFiles] = useState([]);
  const [profile, setProfile] = useState(props.profile);
  const [open, setOpen] = useState(false);

  const modifyProfileInfo = profileInfo => {
    if (files.length == 1) {
      const formData = new FormData();
      formData.append("profile", files[0]);
      Object.entries(profileInfo).forEach(([key, val]) => {
        if (Array.isArray(val)) {
          for (var i = 0; i < val.length; i++) {
            formData.append(key + "[]", val[i]);
          }
        } else {
          formData.append(key, val);
        }
      });
      console.log(formData.get("expertise[]"));
      authFetch({
        url: "/profile",
        method: "PUT",
        isForm: true,
        formData
      }).then(res => {
        if (res.error) {
          console.log(res.error);
        } else {
          props.setProfile(res);
        }
      });
    } else {
      authFetch({
        url: "/profile",
        method: "PUT",
        body: JSON.stringify(profileInfo)
      }).then(res => {
        if (res.error) {
          console.log(res.error);
        } else {
          props.setProfile(res);
        }
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const updatedInfo = profile;

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
            <Grid
              container
              xs={12}
              alignContent="center"
              alignItems="center"
              direction="column"
              style={{ border: "2px solid red" }}
            >
              <Grid item style={{ border: "2px solid red" }}>
                <Avatar
                  alt={profile.name}
                  src={profile.profilePic.link}
                  className={classes.bigAvatar}
                />

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

                <TextField
                  type="text"
                  name="linkedIn"
                  id="localinkedIntion"
                  margin="normal"
                  variant="standard"
                  label="linkedIn"
                  value={profile.linkedIn}
                  onChange={e => {
                    const val = e.target.value;
                    setProfile(prevState => {
                      return { ...prevState, linkedIn: val };
                    });
                  }}
                  fullWidth
                />

                <TextField
                  type="text"
                  name="angelList"
                  id="angelList"
                  margin="normal"
                  variant="standard"
                  label="angelList"
                  value={profile.angelList}
                  onChange={e => {
                    const val = e.target.value;
                    setProfile(prevState => {
                      return { ...prevState, angelList: val };
                    });
                  }}
                  fullWidth
                />

                <TextField
                  type="text"
                  name="expertise"
                  id="expertise"
                  margin="normal"
                  variant="standard"
                  label="expertise"
                  value={profile.expertise}
                  onChange={e => {
                    const val = e.target.value;
                    setProfile(prevState => {
                      console.log({ ...prevState, expertise: [val] });
                      return { ...prevState, expertise: [val] };
                    });
                  }}
                  fullWidth
                />

                <FileUpload fileNumber={1} files={files} setFiles={setFiles} />

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
