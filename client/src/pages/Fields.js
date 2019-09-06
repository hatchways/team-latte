import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  fields: {
    padding: 50
  },
  field: {
    padding: 2
  }
});

export default function Fields(props) {
  const classes = useStyles();
  const fields = props.fieldsData;
  console.log(fields);

  /*
   This component should be receiving profile.expertise (which is an array) and then proceed to show each expertise in a Chip BUT it fails to iterate over 'fields'
   i.e. <Chip label={fields[0]} ... /> fails to render
   Currently have a test Chip
   */

  return (
    <h1>
      <Chip label={"test"} color="primary" size="small" className={classes.field} />
    </h1>
  );
}
/*
<Grid container justify="center" alignItems="center" className={classes.fields}>
      {fields.map(field => (
        <Chip label={field} color="primary" size="small" className={classes.field} />
      ))}
    </Grid>
*/
