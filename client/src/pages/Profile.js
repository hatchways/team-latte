import React from "react"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

export class ProfilePage extends React.Component {
  
  render() {

    return (
      <React.Fragment>
        <Grid container spacing={0} className="flexsection">
          <Grid item xs={3} className={"profile-info"}>
            <h1>Profile Info</h1>
            <h1>Column 1</h1>
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