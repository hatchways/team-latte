import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import { makeStyles, Container, Typography, TextField, Button, CssBaseline, Divider, FormControlLabel, Checkbox } from '@material-ui/core';

//Comment for observing testing

const useStyles = makeStyles( theme => ({
    containerTweaks: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: '"ProximaNova"', //Not sure how to change font
    },
    pageInfoTweaks: {
        margin: theme.spacing(1),
        border: '2px solid red'
    },
   
    dividerTweaks: {
        margin: theme.spacing(2)
    },
    button: {
        backgroundColor: '#69E781',
        margin: theme.spacing(3, 0, 2),
        color: 'white'
    }

}));

function Login() {

    const classes= useStyles();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = ( (e) => {
        e.preventDefault();
        alert(`Submitting ${email} & ${password}`);
    })

    return(
        <Container component="main" maxWidth='xs' style={{border: '2px solid red'}} > 
        <CssBaseline/>
        
        <div className={classes.containerTweaks}>
            <div className={classes.pageInfoTweaks}>
                <Typography variant="h4">Member login</Typography>
                <Divider variant="fullWidth" className={classes.dividerTweaks}/>
                <Typography align="center">New here? <Link to="/signup">Sign Up</Link></Typography>
                
            </div>
            <div>
            <form onSubmit={handleSubmit}>
            <TextField 
                        type="email" 
                        name="email" 
                        id='email'
                        variant="outlined"
                        margin="normal"
                        onChange={e =>setEmail(e.target.value)} 
                        label="Email Address" fullWidth required />
            <TextField 
                        type="password" 
                        name="password"
                        id='password'
                        margin='normal' 
                        variant="outlined"
                        onChange={e => setPassword(e.target.value)} 
                        label="Password" fullWidth required />
            <FormControlLabel label="Remember me" control={<Checkbox value='remember'/>} />
            <Button className={classes.button}
                type='submit'
                name='password'
                variant='contained'
                fullWidth
                >
                Submit
            </Button>  
            </form>
            </div> 
        </div>
        </Container>
        )
}


export default Login;