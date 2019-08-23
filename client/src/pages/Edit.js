import React from 'react';

import { Grid, Paper, CssBaseline, Typography, makeStyles, 
    Button, Stepper, Step, StepLabel, TextField, FormControl, 
    MenuItem, Select } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const EditPageStyling = makeStyles(theme => ({
        containerTweaks: {
            marginTop: theme.spacing(9),
            border: `2px solid red`
        }, //need to change this when global theme is changed

        firstColumn: {
            marginLeft: theme.spacing(0)
        }
    
})
);

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
    return(
        <Grid container component='main'>
            <CssBaseline />
            <Grid item>
            <Grid component ={Paper}></Grid>
            </Grid>

        </Grid>
    )
};

export default EditForm;
