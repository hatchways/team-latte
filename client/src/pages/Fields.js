import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  fields: {
    padding: 50,
  },
  field: {
    padding: 2,
  },
})



export default function Fields(props) {
  const classes = useStyles()
  const fields = props.fieldsData
  return (
    <Grid container justify="center" alignItems="center" className={classes.fields}>
      {
        fields.map(field => (
          <Chip label={field} color="primary" size="small" className={classes.field}/> 
        ))
      }
  </Grid>
  )
}