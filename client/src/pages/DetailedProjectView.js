import React, { useState } from "react";
import {
  Button, Dialog, DialogTitle, DialogActions,
  DialogContent, DialogContentText, Typography,
  Chip, Grid, Card, CardMedia, AppBar, Tabs, Tab, Avatar, CardContent, Divider} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import coffeeCup from '../assets/coffee-cup.jpg'
import { typography } from "@material-ui/system";

const detailedView = makeStyles({
  dialogSize: {
    maxWidth: '900px'
  }
})

const project = {
  category: "Life Hacks",
  alt: "Pouring Coffee",
  industry: "Restaurant",
  title: "Energy Rush: an even quicker coffee experience",
  raised: "34,912",
  goal: "50,000",
  equity: "5%",
  daysToGo: "5",
  author: "Jerry",
  location: "NYC, NY"
};

function DetailedProjectView() {
  const classes = detailedView();

  const [open, setOpen] = useState(true);

  const handleOpenClick = () => {
    setOpen(true)
  }


  return (
    <div>
      <Button onClick={handleOpenClick}>Hello</Button>
      <Dialog open={open} fullWidth>
        <DialogTitle>
          <Chip label={project.category} size="small" />
            <Typography variant='h5'>{project.title}</Typography>
            <Typography variant='body2'>Project Subtitle</Typography>
        </DialogTitle>

        <DialogContent>
        <Grid container spacing="1">
        
          <Grid item xs="8">
                <Card >
                  <CardContent>
                  <CardMedia image={coffeeCup} src="img" style={{height: '220px'}} />
                  <Tabs>
                      <Tab label="About"/>
                      <Tab label="Team"/>
                      <Tab label="Market Size"/>
                      <Tab label="Traction"/>
                      <Tab label="Goals"/>
                      <Tab label="Investment"/>
                  </Tabs>
                  <Typography>example</Typography>
                  <Typography>example</Typography>
                  <Typography>example</Typography>
                  <Typography>example</Typography>
                  <Typography>example</Typography>
                  <Typography>example</Typography>

                </CardContent>
                </Card>
          </Grid>

          
          <Grid item xs='4'>
           
                <Card>
                <CardContent>
                    <Typography variant="body2">
                      ${project.raised}
                    </Typography>
                  <Typography variant="body2">
                    / ${project.goal}
                  </Typography>
                    
                  <Avatar src={coffeeCup} />
                  <Typography variant="p2">{project.author}</Typography>
                  <Typography variant="p2">{project.location}</Typography>

                  <DialogActions>
                    <Button>Send Message</Button>
                    <Button>Fund This Project</Button>
                  </DialogActions>
                  
                  </CardContent>
                </Card>
         
          </Grid>

          </Grid>
          </DialogContent>
        
      </Dialog>
    </div>
  );
}

export default DetailedProjectView;


/*
            1. Chip on top for category
            2. title of project
            3. Subtitle of project
            4. LEFT SIDE
                1. Video block
                2. Tabs (look into appbar or toolbar); 6 sections 
                    1. About
                    2. Team
                    3. Market Size
                    4. Traction
                    5. Goals
                    6. Investment
                3. Each tab should have:
                    1. Title of the tab
                    2. Sections as required
*/