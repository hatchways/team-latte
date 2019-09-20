import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Chip,
  Grid,
  Card,
  CardMedia,
  Tabs,
  Tab,
  Avatar,
  CardContent,
  Divider,
  Box,
  LinearProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { fieldsStyle } from "./Fields";
import className from "classnames";

import coffeeCup from "../assets/coffee-cup.jpg";

const detailedView = makeStyles({
  dialogSize: {
    //minHeight: "1500px",
    border: "2px solid red"
  },
  dialogTitle: {
    //border: "2px solid red",
    alignItems: "center",
    textAlign: "center"
  },
  chipPosition: {
    // border: "2px solid red",
    marginBottom: 20
  },
  rightCard: {
    minHeight: "500px",
    borderRadius: "0px",
    border: "2px solid red"
  },
  media: {
    height: 320
  },
  leftCard: {
    width: "100%"
    //borderRadius: '0px',
  },
  tabBox: {
    flexGrow: 1,
    border: "2px solid red",
    justifyContent: "center"
  }
});


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
  location: "NYC, NY",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  images: "...",
  summaryPoints: ["Lower Expenses", "Feature 2", "Feature 3"],
  teamMembers: [
    {
      name: "Person A",
      image: { coffeeCup }
    },
    {
      name: "Person B",
      image: { coffeeCup }
    }
  ]
};

function TabSection(props) {
  const { value, index, ...others } = props;

  const AboutSection = value => {
    return (
      <div>
        <Grid container xs="12">
          <Typography variant="h2" style={{ textAlign: "left" }}>
            About
          </Typography>
          <Divider />
          <Grid item xs="12">
            
              <Typography variant="body1">{project.description}</Typography>
              {project.summaryPoints.map(point => {
                return <Typography variant="body2">{point}</Typography>;
              })}
            
          </Grid>
        </Grid>
      </div>
    );
  };
  const Team = value => {
    return (
      <div>
        <Grid container xs="12">
          <Typography variant="h2" style={{ textAlign: "left" }}>
            Team
          </Typography>
          <Divider />
          <Grid item xs="12">
            <Box>
              {project.teamMembers.map(member => {
                return <Typography variant="body1">{member.name}</Typography>;
              })}

              {project.summaryPoints.map(point => {
                return <Typography variant="body2">{point}</Typography>;
              })}
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <div>
      {value === 0 && <AboutSection />}
      {value === 1 && <Team />}

      <AboutSection></AboutSection>
      <Team></Team>
    </div>
  );
}

function DetailedProjectView(props) {
  const classes = detailedView();
  const fieldsClasses = fieldsStyle();

  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Dialog key={props.key} open={props.open} onClose={props.clickClose} className={classes.dialogSize} maxWidth="lg" project1={props.project1}>

        {console.log(props.project1)}

        <DialogTitle className={classes.dialogTitle}>
          <Chip
            label={props.project1.category}
            color="primary"
            className={className(fieldsClasses.field, fieldsClasses.chip, classes.chipPosition)}
          />
          <Typography variant="h5" color="textPrimary">
            {props.project1.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Project Subtitle
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing="3">

            {/* Left card */}
            <Grid item xs="8" >
              <Card className={classes.leftCard} raised >
          
                  <CardContent>
                    <Grid item xs="12">
                      <CardMedia
                        image={coffeeCup}
                        component="img"
                        alt={project.alt}
                        className={classes.media}
                        
                      />
                    </Grid>
                    <Grid item xs="12" wrap="wrap">
                      <Tabs
                        value={value}
                        onChange={handleTabChange}
                        style={{ borderBottom: "2px solid black" }}
                        variant="fullWidth"
                        centered fll
                      >
                        <Tab label="About" />
                        <Tab label="Team" />
                        <Tab label="Market Size" />
                        <Tab label="Traction" />
                        <Tab label="Goals" />
                        <Tab label="Investment" />
                      </Tabs>
                    </Grid>
                    <Grid>
                    {value === 0 && <TabSection></TabSection>}
                    {value === 1 && <Typography>example1</Typography>}
                    {value === 2 && <Typography>example2</Typography>}
                    {value === 3 && <Typography>example3</Typography>}
                    {value === 4 && <Typography>example4</Typography>}
                    {value === 5 && <Typography>example5</Typography>}
                    </Grid>
                  </CardContent>
                
              </Card>
            </Grid>

            {/* Right card */}
            <Grid item xs="4">
              <Card className={classes.rightCard}>
                <CardContent>
                  <Grid container style={{ border: "2px solid red" }}>
                    <Typography variant="h4">${project.raised}</Typography>
                    <Typography variant="body2">/ {project.goal}</Typography>
                  </Grid>

                  <Grid>
                    <LinearProgress variant="determinate" />
                  </Grid>

                  <Grid>
                    <Typography>Equity Exchange: {project.equity}</Typography>
                  </Grid>

                  <Grid>
                    <Avatar src={coffeeCup} />
                  </Grid>

                  <Grid>
                    <Typography variant="p2">{project.author}</Typography>
                    <Typography variant="p2">{project.location}</Typography>
                  </Grid>

                  <DialogActions>
                    <Button>Send Message</Button> 
                    <Button onClick={props.clickClose}>Fund This Project</Button>
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
