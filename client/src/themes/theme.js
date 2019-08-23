import { createMuiTheme } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";

export const theme = createMuiTheme({

  typography: {
    fontFamily: 'Roboto',
    fontSize: 16
  },

  palette: {
    main:{
    primary: "green",
    secondary: '#69E781'
    }
  },
                                    
  overrides: {
    MuiAppBar: {
      colorPrimary:{    //Shouldn't that be only allowing edits to colors-related property? Ho
        backgroundColor: '#fff',
        color: 'color',
        minHeight: '60px',
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingLeft: '40px',
        position:'absolute'

      }
    },
    MuiButton: {
      root:{
        minHeight: '60px',
      }
    },

    MuiFormControlLabel: {
      root: {
        '&:hover': {
          backgroundColor: 'blue',
          
        }
      }
    }

  }
  
});

export default theme;

