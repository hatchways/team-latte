import { createMuiTheme } from "@material-ui/core";


export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Proxima Nova',
    fontSize: 16,
    color: "rgb(0,0,0)"
  },
  primary: 'rgba(0, 0, 0, 0.1)',
  secondary: "#1f1f1f",
  error: "#d8000c",
  bgcolor: 'rgba(255, 255, 255, 0.1)',
  
  overrides: {
    MuiButton: {
      text: {
        color: '#0066ff'
    }
  },
  MuiAppBar: {
    text: {
      fontSize: 16
    }
  }
  }
});
