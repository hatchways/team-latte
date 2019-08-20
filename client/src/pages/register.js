/* eslint-disable no-useless-constructor */
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { Typography, Container, TextField, Button,CssBaseline,makeStyles, Divider } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    containerTweaks: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: '"ProximaNova"', //Not sure how to change font
    },
    pageInfoTweaks: {
        margin: theme.spacing(1)
    },
    dividerTweaks: {
        margin: theme.spacing(2)
    },
    button: {
        backgroundColor: '#69E781',
        margin: theme.spacing(3, 0, 2),
    }

}));

function Signup () {

    const classes = useStyles();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    const handleSubmit = ( (e) => {
        e.preventDefault();
        alert(`Submitting ${email} & ${password}`);
    });

    return( 

        <Container component="main" maxWidth="xs">
        <CssBaseline/>

        <div className={classes.containerTweaks}>
            <div className={classes.pageInfoTweaks}>
                <Typography component='h1' variant='h4'>Create an account</Typography>
                <Divider variant="fullWidth" className={classes.dividerTweaks}/>
                <Typography align="center">Already a member? <Link to="/login">Login</Link></Typography>

            </div>
            <div>
            <form onSubmit={handleSubmit} >
            <TextField
                        type="name" 
                        name="name" 
                        id='name'
                        variant="outlined"
                        margin="normal"
                        onChange={e =>setEmail(e.target.value)} 
                        label="Name" fullWidth required />
            
            <TextField
                        type="email" 
                        name="email" 
                        id='password'
                        variant="outlined"
                        margin="normal"
                        onChange={e =>setEmail(e.target.value)} 
                        label="Email address" fullWidth required />
            <TextField 
                        type="password" 
                        name="email"
                        id="password"
                        margin='normal' 
                        variant="outlined"
                        onChange={e => setPassword(e.target.value)} 
                        label="Password" fullWidth required />
            <TextField 
                        type="confirm" 
                        name="confirm"
                        id="confirm"
                        margin='normal' 
                        variant="outlined" 
                        label="Confirm Password" fullWidth required />
            <Button className={classes.button}
                type='submit'
                name='password'
                variant='contained'
                fullWidth
                >
                Create Account
            </Button>  
            </form>
            </div>
        </div>
        </Container>

    )
};

export default Signup;