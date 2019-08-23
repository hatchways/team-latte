import { createMuiTheme } from "@material-ui/core";

//This is creating a custom theme...
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
  
  palette: {
    main:{
    primary: "#69E781"
    }
  },
                                    
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

export default theme;

