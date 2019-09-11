/* eslint-disable no-useless-constructor */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Container,
  TextField,
  Button,
  CssBaseline,
  makeStyles,
  Divider,
  Snackbar
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  containerTweaks: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: '"ProximaNova"' //Not sure how to change font
  },
  pageInfoTweaks: {
    margin: theme.spacing(1)
  },
  dividerTweaks: {
    margin: theme.spacing(2)
  },
  button: {
    backgroundColor: "#69E781",
    color: "white",
    margin: theme.spacing(3, 0, 2)
  }
}));
//try pushing a 'props' arugment for router history...
function Signup() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    backendRegister({
      name,
      email,
      password
    });
    //alert(`Submitting ${email} & ${password}`);
  };

  const backendRegister = newUser => {
    
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => {
        
        const response = res.json();
        if (res.status > 499) throw Error("Server error");
        else return response;
      })
      .then(res => {
        if (res.status > 299) throw Error(res.message + "");
        window.sessionStorage.setItem("AuthToken", res.token);
        window.sessionStorage.setItem("userID", JSON.stringify(res.user))
        window.location.replace("/profile/" + res.user._id);
      })
      .catch(err => {
        console.log(err)
        setVisible(true);
        setError(err + "");
      });
  };

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setVisible(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.containerTweaks}>
        <div className={classes.pageInfoTweaks}>
          <Typography component="h1" variant="h4">
            Create an account
          </Typography>
          <Divider variant="fullWidth" className={classes.dividerTweaks} />
          <Typography align="center">
            Already a member? <Link to="/login">Login</Link>
          </Typography>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              type="name"
              name="name"
              id="name"
              variant="outlined"
              margin="normal"
              onChange={e => setName(e.target.value)}
              label="Name"
              fullWidth
              required
            />

            <TextField
              type="email"
              name="email"
              id="email"
              variant="outlined"
              margin="normal"
              onChange={e => setEmail(e.target.value)}
              label="Email address"
              fullWidth
              required
            />
            <TextField
              type="password"
              name="email"
              id="password"
              margin="normal"
              variant="outlined"
              onChange={e => setPassword(e.target.value)}
              label="Password"
              fullWidth
              required
            />
            <TextField
              type="password"
              name="confirm"
              id="confirm"
              margin="normal"
              variant="outlined"
              //onChange={e => comparePassword(e.target.value)}
              label="Confirm Password"
              fullWidth
              required
            />
            <Button
              className={classes.button}
              type="submit"
              name="password"
              variant="contained"
              fullWidth
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={visible}
        autoHideDuration={6000}
        message={error}
        action={
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </Container>
  );
}

export default Signup;
