import React from "react";

import {
  Grid,
  Paper,
  CssBaseline,
  Typography,
  makeStyles,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  MenuItem,
  Select
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const EditPageStyling = makeStyles(theme => ({
  containerTweaks: {
    marginTop: theme.spacing(9),
    border: `2px solid red`
  }, //need to change this when global theme is changed

  firstColumn: {
    marginLeft: theme.spacing(0)
  }
}));

//A 2-columns grid styled page
//1st column containing:
//main header stating 'PROJECT name',
//Button to preview how project looks like,
//Vertical stepper to convey progress of setting up the project,
//Button to delete project (@ dead bottom of screen)
//2nd column containinng:
//main header describing current step (of the stepper)
//description of + textfield for projectTitle
//description of + textfield for subtitle (No idea what this actually is)
//description of + drop-down list for proejct's industry (should be pre-selected due to selection in previous page)
//description of + drop-down list for project's location
//description of +
// field to 'drop & upload' photos + grid-styled field to show uploaded project pictures
//description of + textfield for funding goal amount
//Button to save progress
//This should progress user to the next step

function EditForm() {
  const classes = EditPageStyling();

  return (
    <Grid
      container
      component="main"
      spacing={7}
      className={classes.containerTweaks}
    >
      <CssBaseline />

      <Grid
        item
        xs={false}
        sm={4}
        md={3}
        component={Paper}
        elevation={6}
        square
        className={classes.firstColumn}
      >
        <Typography variant="h6">Sample project name</Typography>
        <Button>Preview</Button>
        <Stepper orientation="vertical">
          <Step>
            <StepLabel>Basics</StepLabel>
          </Step>
          <Step>
            <StepLabel>Rewards</StepLabel>
          </Step>
          <Step>
            <StepLabel>Rewards</StepLabel>
          </Step>
          <Step>
            <StepLabel>Story</StepLabel>
          </Step>
          <Step>
            <StepLabel>People</StepLabel>
          </Step>
          <Step>
            <StepLabel>Payment</StepLabel>
          </Step>
        </Stepper>
        <Button>
          <DeleteIcon></DeleteIcon>Delete Project
        </Button>
      </Grid>

      <Grid item xs={false} md={9}>
        <div component={Paper}>
          <Typography variant="h5">Let's start with basics</Typography>

                <Button>Preview</Button>
                <Stepper orientation='vertical'>
                    <Step >
                        <StepLabel>Basics</StepLabel>
                    </Step>
                    <Step >
                        <StepLabel>Rewards</StepLabel>
                    </Step>
                    <Step >
                        <StepLabel>Rewards</StepLabel>
                    </Step>
                    <Step >
                        <StepLabel>Story</StepLabel>
                    </Step>
                    <Step >
                        <StepLabel>People</StepLabel>
                    </Step>
                    <Step >
                        <StepLabel>Payment</StepLabel>
                    </Step>
                </Stepper>
                <Button><DeleteIcon></DeleteIcon>Delete Project</Button>
           </div>
            </Grid>
            
            <Grid item xs={false} md={9} >
                <div component={Paper} >
                    <Typography variant="h5">Let's start with basics</Typography>
                    
                    <Typography variant="body1">Project Title</Typography>
                        <TextField variant="outlined" label="Name of your awesome project" required />
                    
                    <Typography variant="body1">Subtitle</Typography>
                        <TextField variant="outlined" label="Tell us more about your project..."/>
                    
                    <Typography variant="body1">Industry</Typography>
                        <FormControl  variant="outlined" required>
                        <Select autoWidth>
                            <MenuItem value="">Select Industry</MenuItem>
                            <MenuItem value={1}>Industry 1</MenuItem>
                            <MenuItem value={2}>Industry 2</MenuItem>
                            <MenuItem value={3}>Industry 3</MenuItem>
                            <MenuItem value={4}>Industry 4</MenuItem>
                        </Select>
                    </FormControl>

          <Typography variant="body1">Project Title</Typography>
          <TextField
            variant="outlined"
            label="Name of your awesome project"
            required
          />

          <Typography variant="body1">Subtitle</Typography>
          <TextField
            variant="outlined"
            label="Tell us more about your project..."
          />

          <Typography variant="body1">Industry</Typography>
          <FormControl variant="outlined" required>
            <Select autoWidth>
              <MenuItem value="">Select Industry</MenuItem>
              <MenuItem value={1}>Industry 1</MenuItem>
              <MenuItem value={2}>Industry 2</MenuItem>
              <MenuItem value={3}>Industry 3</MenuItem>
              <MenuItem value={4}>Industry 4</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="body1">Project Location</Typography>
          <FormControl variant="outlined" required>
            <Select autoWidth>
              <MenuItem value="">Select Location</MenuItem>
              <MenuItem value={1}>Location 1</MenuItem>
              <MenuItem value={2}>Location 2</MenuItem>
              <MenuItem value={3}>Location 3</MenuItem>
              <MenuItem value={4}>Location 4</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Grid>
    </Grid>
  );
}

export default EditForm;
