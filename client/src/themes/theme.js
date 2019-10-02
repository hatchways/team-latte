import { createMuiTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeightRegular: 500
  },

  palette: {
    primary: { main: "rgb(79 199 116)" },
    secondary: { main: green[300] }
  },

  overrides: {
    MuiAppBar: {
      colorPrimary: {
        //Shouldn't that be only allowing edits to colors-related property? Ho
        backgroundColor: "#fff",
        color: "color",
        minHeight: "60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: "40px"
      }
    },
    MuiButton: {
      root: {
        minHeight: "60px"
      }
    },

    MuiFormControlLabel: {
      root: {
        /*'&:hover': {
          backgroundColor: 'blue',
          
        }*/
      }
    }
  }
});

export default theme;
