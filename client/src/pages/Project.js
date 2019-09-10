import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { fieldsStyle } from "./Fields";
import classNames from "classnames";
import {
  Card,
  Chip,
  CardActionArea,
  CardContent,
  Grid,
  CardMedia,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    margin: "20px 10px 20px 10px",
    maxWidth: 320,
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

  const projects = props.projectData;

  return (
    <Grid container justify="flexStart">
      {projects.map(project => (
        <Grid item xs={12} sm={6} md={4}>
          <ProjectCard withAuthor={props.withAuthor} project={project} />
        </Grid>
      ))}
    </Grid>
  );
}

export function ProjectCard(props) {
  const mainClasses = useStyles();
  const fieldsClasses = fieldsStyle();
  return (
    <Card className={mainClasses.card} raised>
      <CardActionArea>
        <Chip
          color="primary"
          label={props.project.category}
          className={classNames(mainClasses.chipPosition, fieldsClasses.chip)}
        ></Chip>
        <CardMedia
          className={mainClasses.media}
          image={props.project.img}
          title={props.project.alt}
        />
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {props.project.title}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="h2">
            ${props.project.raised} /
            <Typography variant="body2" color="textSecondary" display="inline">
              {props.project.goal}
            </Typography>
          </Typography>

          <Typography variant="body2" color="textSecondary" component="h2">
            Equity exchange: {props.project.equity} | {props.project.daysToGo}{" "}
            days to go
          </Typography>
        </CardContent>
      </CardActionArea>
      {props.withAuthor && (
        <div className={mainClasses.cardFooter}>
          <div className={mainClasses.cardFooterContent}>
            <Typography variant="body2" color="textPrimary">
              {props.project.author}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {props.project.location}
            </Typography>
          </div>
        </div>
      )}
    </Card>
  );
}
