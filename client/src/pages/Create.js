import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Typography, CssBaseline, Divider, FormControl,
    Select, MenuItem, FormControlLabel, Checkbox, FormGroup, Button, InputLabel, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const StylingCreateForm = makeStyles( theme => ({
    containerTweaks: {
        fontsize: 8
    },
    dividerTweaks: {
        margin: theme.spacing(3),

    },

    formControl: {
        width: '75%',
        margin: theme.spacing(2),
        fontSize: '16'
        
    },

    textField: {
        width: '75%',
        margin: theme.spacing(2),
    },
    
    button: {
        backgroundColor: '#69E781',
        color: 'white',
        margin: theme.spacing(3, 0, 2),
        minHeight: 80,
        minWidth: 250
    }

    }
    )
);

//A form containing 
    //main header, 
    //divider, 
    //description of + first drop-down list
    //description + box for you to describe what you're creating
    //description + drop-down list of your location 
    //3 checkboxes for misc details 
    //button to continue to Edit page (hint: route it to /Edit.js)

function CreateForm() {

    const classes = StylingCreateForm();
    const handleSubmit = ( (e) => {
        e.preventDefault();
    })

    return(
        <Container component="main" maxWidth="sm" style={{marginTop: '70px'}}>
           <CssBaseline />
            <form onSubmit={handleSubmit} style={{textAlign: 'center'}}>
                <Typography variant="h4">Let's get Started</Typography>
                <Divider variant='fullWidth' className={classes.dividerTweaks}/>
                
                <Typography variant="body2">Pick a project industry to connect with a community.<br/>You can always update this later.</Typography>
                <FormControl variant='outlined' className={classes.formControl}>
                    <InputLabel>Select Industry</InputLabel>
                    <Select>
                        <MenuItem value="">Select Industry</MenuItem>
                        <MenuItem value={1}>Industry 1</MenuItem>
                        <MenuItem value={2}>Industry 2</MenuItem>
                        <MenuItem value={3}>Industry 3</MenuItem>
                        <MenuItem value={4}>Industry 4</MenuItem>
                    </Select>
                </FormControl >
                
                <Typography variant="body2">Describe what you'll be creating.</Typography>
                    <TextField variant="outlined" label="Describe your project" multiline rows="4" 
                                className={classes.textField} fullWidth></TextField>
                <Typography variant='body2'>Tell us where you're based and confirm a few other<br/> details before we proceed.</Typography>
                <FormControl variant="filled"className={classes.formControl}>
                    <InputLabel>Select Location</InputLabel>
                    <Select autoWidth>
                        <MenuItem value="">Select Location</MenuItem>
                        <MenuItem value={1}>Location 1</MenuItem>
                        <MenuItem value={2}>Location 2</MenuItem>
                        <MenuItem value={3}>Location 3</MenuItem>
                        <MenuItem value={4}>Location 4</MenuItem>
                    </Select>
                </FormControl>

                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox value='age'/>} label="I'm at least 18 years old"/>
                    <FormControlLabel
                        control={<Checkbox value='legit'/>} label="I can verify a bank account and government-issued ID"/>
                    <FormControlLabel
                        control={<Checkbox value='money'/>}  label="I have a debit and/or credit card"/>
                </FormGroup>

                <Link to='/edit'><Button className={classes.button}>Continue</Button></Link>
            </form>
    
        </Container>
    )
}

export default CreateForm;