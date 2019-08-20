import { createMuiTheme } from "@material-ui/core";

//This is creating a custom theme...
/* export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"'
  },
  primary: "#f04040",
  secondary: "#1f1f1f",
  error: "#d8000c",
  bgcolor: "#f6f6f6"
});
*/

const theme = createMuiTheme({
  palette: {
    primary: "#69E781"
  },
  typography: {
    fontFamily:"Arial"
  }

});

export default theme;

