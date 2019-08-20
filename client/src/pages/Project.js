import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  gridList: {
    width: 500,

  },
  card: {
    maxWidth: 345,
    padding: 30,
  },
  media: {
    height: 300,
  },
}));

export default function ProjectList(props) {
  const classes = useStyles()
  const projects = props.projectData

  return (
    <GridList cols={2} spacing={5} className={classes.gridlist}>
      {
        projects.map(project => (
          <ProjectCard project={project}/>
        ))
      }
    </GridList>
  )
}

export function ProjectCard(props) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
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
            Equity exchange: {props.project.equity} | {props.project.daysToGo} days to go
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )

}