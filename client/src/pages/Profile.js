import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import { Typography } from "@material-ui/core"
import Button from '@material-ui/core/Button';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import JHAvatar from '../assets/jh-avatar.jpg'
import "./Profile.css"

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  fields: {
    padding: 50,
  },
  field: {
    padding: 2,
  },
  projectTitle: {
    padding: 20,
  },
  projectGridList: {
    padding:20,
  }
});

export default function ProfilePage() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Grid container spacing={2} className="flexsection">
        {/* Left part */}
        <Grid item xs={3} justify="center" className={"flex-col-scroll"}>
          <Grid container direction="column" spacing={3}>
            <Grid container justify="center" alignItems="center">
              <Avatar alt="James Hampton"  src={JHAvatar} className={classes.bigAvatar} />
            </Grid>


            <Grid container justify="center" alignItems="center" className="full-name">
              <Typography variant="h4" gutterBottom>
                James Hampton
              </Typography>
            </Grid>

            <Grid container justify="center" alignItems="center" className={classes.location}> 
              <Typography variant="body2" color="textSecondary" gutterBottom >
                <LocationOnIcon/>
                Toronto, Canada
              </Typography>
            </Grid>

            <Grid container justify="center" alignItems="center" className={classes.fields}>
              <Chip label="TECHNOLOGY" color="primary" size="small" className={classes.field}/>
              <Chip label="COFFEE" color="primary" size="small" className={classes.field}/>
              <Chip label="CUSTOMER SERVICE" color="primary" size="small" className={classes.field}/>
              <Chip label="RESTAURANT" color="primary" size="small" className={classes.field}/>
            </Grid>
            
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

  )

}

