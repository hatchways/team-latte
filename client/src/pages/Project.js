import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { fieldsStyle } from "./Fields";
import classNames from "classnames";
import { Card, Chip, CardActionArea, CardContent, Grid, CardMedia, Typography } from "@material-ui/core";
import DetailedProjectView from "./DetailedProjectView";

const useStyles = makeStyles(theme => ({
  card: {
    margin: "20px 10px 20px 10px",
    maxWidth: 320,
    maxHeight: 500,
    borderRadius: 0
  },

  media: {
    height: 245
  },
  gridlist: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    justifyContent: "flex-start"
  },

  chipPosition: {
    zIndex: 1,
    position: "absolute",
    top: "20px",
    left: "40px"
  },

  cardFooter: {
    borderTop: "1px solid",
    borderColor: "rgb(205,205,205)",
    textAlign: "left"
  },

  cardFooterContent: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

export default function ProjectList(props) {
  const classes = useStyles();
 // const [projects, setProject] = useState(props.projectData)

  const projects = props.projectData;
console.log(projects)
  return (
    <div>
      <Grid container justify="flexStart">
      
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4}>
            <ProjectCard  onClick={props.onClick} withAuthor={props.withAuthor} project={project}/> 
           
          </Grid>  
        ))}

      </Grid>
    </div>
  );
}

function ProjectCard(props) {
  const mainClasses = useStyles();
  const fieldsClasses = fieldsStyle();

  const [open, setOpen] = useState(false);
  const handleOpenClick = () => {
    setOpen(true);

  };
  const handleCloseClick = () => {
    setOpen(false);
  };

  const imgCard =
    props.project.photos && props.project.photos.length > 0
      ? props.project.photos[0].photo.link
      : props.project.img;

  return (
    <Card  className={mainClasses.card} raised>
      <CardActionArea onClick={handleOpenClick}>
        <Chip
          color="primary"
          label={props.project.industry}
          className={classNames(mainClasses.chipPosition, fieldsClasses.chip)}
        ></Chip>
        <CardMedia className={mainClasses.media} image={imgCard} title={props.project.title} />

        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {props.project.title}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="h2">
            ${props.project.raised_amount} /
            <Typography variant="body2" color="textSecondary" display="inline">
              ${props.project.funding_goal}
            </Typography>
          </Typography>

          <Typography variant="body2" color="textSecondary" component="h2">
            Equity exchange: {props.project.equity}%  </Typography>
            <br/>
          <Typography variant="body2" color="textSecondary" component="h2">
          {props.project.daysToGo} days to go </Typography>
        </CardContent>
      </CardActionArea>

      
        <div className={mainClasses.cardFooter}>
          <div className={mainClasses.cardFooterContent}>
            <Typography variant="body2" color="textPrimary">
              {props.project.authorName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {props.project.location}
            </Typography>
          </div>
        </div>
      
        <DetailedProjectView open={open} clickClose={handleCloseClick} project={props.project}/>

    </Card>
  );
}
