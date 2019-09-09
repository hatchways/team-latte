import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Divider,
  FormControlLabel,
  Checkbox,
  Snackbar
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

//Comment for observing testing

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
    margin: theme.spacing(2, 0, 2),
    color: "white"
  }
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const backendLogin = user => {
    // console.log(user) -->> This shows user = { email: '...', password: '...'}
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user) //
    })
      .then(res => {
        const response = res.json();
        if (res.status > 499) throw Error("Server error");
        else return response;
      })
      .then(res => {
        if (res.status > 299) throw Error(res.message + "");
        window.sessionStorage.setItem("AuthToken", res.token);
        window.location.replace("/profile/" + res.user._id);
      })
      .catch(err => {
        setVisible(true);
        setError(err + "");
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      email,
      password
    };
    // console.log(JSON.stringify(newUser)); //This shows newUser ={'email': '...', 'password': '...'}
    backendLogin(newUser);
  };

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setVisible(false);
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.containerTweaks}>
      <CssBaseline />

      <div>
        <div className={classes.pageInfoTweaks}>
          <Typography variant="h4" align="center">
            Member login
          </Typography>
          <Divider variant="fullWidth" className={classes.dividerTweaks} />
          <Typography align="center">
            New here? <Link to="/signup">Sign Up</Link>
          </Typography>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              type="email"
              name="email"
              id="email"
              variant="outlined"
              margin="normal"
              onChange={e => setEmail(e.target.value)}
              label="Email Address"
              fullWidth
              required
            />
            <TextField
              type="password"
              name="password"
              id="password"
              margin="normal"
              variant="outlined"
              onChange={e => setPassword(e.target.value)}
              label="Password"
              fullWidth
              required
            />
            <FormControlLabel label="Remember me" control={<Checkbox value="remember" />} />
            <Button className={classes.button} type="submit" name="password" variant="contained" fullWidth>
              Login
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
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      />
    </Container>
  );
}

export default Login;
