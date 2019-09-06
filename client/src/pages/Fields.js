import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";
export const fieldsStyle = makeStyles({
  fields: {
    padding: 50
  },
  field: {
    padding: 2,
    margin: 3
  },

  chip: {
    textTransform: "uppercase",
    color: "white",
    fontWeight: 600
  }
});

export default function Fields(props) {
  const classes = fieldsStyle();
  const fields = props.fieldsData;
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.fields}
    >
      {fields.map(field => (
        <Chip
          label={field}
          color="primary"
          size="small"
          className={classNames(classes.field, classes.chip)}
        />
      ))}
    </Grid>
  );
}
