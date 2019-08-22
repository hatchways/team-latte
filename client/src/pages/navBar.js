import React from 'react';
import { NavLink} from 'react-router-dom'
import {AppBar, Toolbar, Typography, makeStyles, Avatar, CssBaseline, Button, } from '@material-ui/core'
import Launch from  '../themes/ic-logo.png'

const NavBarStyles = makeStyles(theme=>({
   
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        background: theme.bgcolor,
        fontFamily: theme.typography, //Font is still NOT configured to Proxima Nova
        color: theme.typography.color,
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        height: 60
    },
 
    companyLogo: { // logo is 
        margin: 1,
        height: 30,
        width:30,
        borderRadius: '0'
    },

    separation: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center'
        
    },

    rightButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    link: {
        margin: theme.spacing(0,2,0,2),
        fontSize: theme.typography.fontSize
    }
}));

/*
//This is a styled-component API... similar to creating a custom component
const LoginButton = styled(Button) ({    
    background: 'red',
    color: 'white'
});
*/
function NavBar () {
    const classes=NavBarStyles();
return(
   
<React.Fragment>
        <CssBaseline/>
        
        <AppBar style={{background: "white"}}>
        <Toolbar className={classes.toolbar}>
            <div className={classes.separation}>
            
                <Avatar className={classes.companyLogo} alt="Company Logo" src={Launch}/>
                <Typography variant="h6" style={{marginLeft: '10px'}}>Product Launch</Typography>
            
            </div>
   
            <div className={classes.rightButtons}>
                <Button 
                    variant="Button" 
                    className={classes.link}>
                    <NavLink to='/explore' 
                        activeStyle={{
                            textUnderlinePosition: 'under',
                            textDecorationColor: "#69E781",
                        }}>EXPLORE</NavLink>
                </Button>

                <Button
                    className={classes.link}>
                    <NavLink to='/launch' 
                        activeStyle={{
                            textUnderlinePosition: 'under',
                            textDecorationColor: "#69E781",
                    }}>LAUNCH</NavLink>
                </Button>
                
                <Button 
                    className={classes.link}>
                    <NavLink to='/login' 
                        activeStyle={{
                            textUnderlinePosition: 'under',
                            textDecorationColor: "#69E781",
                    }}>LOGIN</NavLink>
                </Button>
            </div>            
        </Toolbar>
        </AppBar>
 
    </React.Fragment>
    
)
};

export default NavBar;