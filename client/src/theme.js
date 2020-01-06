import { red, blueGrey } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#93b7be"
    },
    secondary: {
      main: "#84817a"
    },
    error: {
      main: "#f1ab86"
    },
    background: {
      default: "#f1f1f1"
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    navFont: ["'Lobster', cursive"].join(",")
  }
});

export default theme;
