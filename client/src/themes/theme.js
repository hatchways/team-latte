import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({

  typography: {
    fontFamily: 'Roboto',
    fontSize: 16
  },

  palette: {
    main:{
    primary: "#ff0000",
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
    }

  }
  
});

export default theme;

