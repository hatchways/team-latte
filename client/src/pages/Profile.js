import React from "react"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip';

import JHAvatar from '../assets/jh-avatar.jpg'

export class ProfilePage extends React.Component {
  
  render() {

    return (
      <React.Fragment>
        <Grid container spacing={2} className="flexsection">
          <Grid container xs={3} justify="center" className={"profile-info"}>

            <Grid container direction="column" alignContent="center">
              <Grid item className="prof-pic">
                <Avatar alt="James Hampton"  src={JHAvatar} className="avatar" />
              </Grid>

              <Grid item className="full-name">
                James Hampton
              </Grid>
              <Grid item className="location"> 
                Toronto, Canada
              </Grid>
              <Grid item className="field">
                My fields are:
              </Grid>

              <Chip label="TECHNOLOGY" color="primary" size="small" />
              <Chip label="COFFEE" color="primary" size="small" />
              <Chip label="CUSTOMER SERVICE" color="primary" size="small" />
              <Chip label="RESTAURANT" color="primary" size="small" />

              

            </Grid>




            

            

          </Grid>

          <Grid item xs={9} className={"projects"}>
            Projects
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
}