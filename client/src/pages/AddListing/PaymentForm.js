import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import "./style.css";

const styles = theme => ({
  paper: {
    margin: "0",
    display: "flex"
  },
  title: {
    marginTop: theme.spacing.unit * 2
  }
});

function PaymentForm(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Paper
        className={classes.paper}
        elevation={0}
        style={{ fontFamily: "Roboto" }}
      >
        <DayPicker
          selectedDays={props.selectedDays}
          onDayClick={props.handleDayClick}
        />
      </Paper>
    </React.Fragment>
  );
}

export default withStyles(styles)(PaymentForm);
// export default PaymentForm;
