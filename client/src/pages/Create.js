import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Typography, CssBaseline, Divider, FormControl,
    Select, MenuItem, FormControlLabel, Checkbox, FormGroup, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const StylingCreateForm = makeStyles( theme => ({
    //...
}));

//A form containing 
    //main header, 
    //divider, 
    //description of + first drop-down list
    //description + box for you to describe what you're creating
    //description + drop-down list of your location 
    //3 checkboxes for misc details 
    //button to continue to Edit page (hint: route it to /Edit.js)

function CreateForm() {

    return(
        <Container component="main" maxWidth="sm">
           <CssBaseline />
            <form style={{textAlign: 'center'}}>
                <Typography variant="h4">Let's get Started</Typography>
                <Divider variant='middle'/>
                <Typography variant="body1">Pick a project industry to connect with a community.</Typography>
                <Typography variant="body1">You can always update this later.</Typography>
                <FormControl>
                    <Select autoWidth>
                        <MenuItem value="">Select Industry</MenuItem>
                        <MenuItem value={1}>Industry 1</MenuItem>
                        <MenuItem value={2}>Industry 2</MenuItem>
                        <MenuItem value={3}>Industry 3</MenuItem>
                        <MenuItem value={4}>Industry 4</MenuItem>
                    </Select>
                </FormControl>
                <Typography variant="body1">Describe what you'll be creating</Typography>
                
                <Typography variant="body1">Tell us where you're based 
                    and confirm a few other details before we proceed.</Typography>
                    <FormControl>
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
                <Button type="submit">
                    <Link to='/edit'>Continue</Link>
                </Button>
            </form>
        </Container>
    )
}

export default CreateForm;