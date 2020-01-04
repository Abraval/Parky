import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6"
    },
    secondary: {
      main: "#e15f41"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#f1f1f1"
    }
  }
});

export default theme;
