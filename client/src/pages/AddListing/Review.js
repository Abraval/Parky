import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing.unit * 2
  },
  container: {
    padding: "20px"
  }
});

function formatDate(date) {
  const newDate = new Date(date);
  return moment(date).format("LL");
}

function Review(props) {
  const { classes } = props;

  const dates = props.selectedDays.map(date => formatDate(date));

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Listing summary
      </Typography>

      <Grid container spacing={16} className={classes.container}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            {props.title}
          </Typography>
          <Typography variant="h6" gutterBottom className={classes.title}>
            ${props.price} per day
          </Typography>
          <Typography gutterBottom>{props.address}</Typography>
          <Typography gutterBottom>
            {props.city}, {props.state} {props.zipcode}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Dates
          </Typography>
          <Grid container>
            <ul>
              {dates.map(date => (
                <li>{date}</li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Review);
