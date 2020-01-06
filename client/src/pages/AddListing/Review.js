import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

// const products = [
//   { name: "Product 1", desc: "A nice thing", price: "$9.99" },
//   { name: "Product 2", desc: "Another thing", price: "$3.45" },
//   { name: "Product 3", desc: "Something else", price: "$6.51" },
//   { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
//   { name: "Shipping", desc: "", price: "Free" }
// ];
// const addresses = [
//   "1 Material-UI Drive",
//   "Reactville",
//   "Anytown",
//   "99999",
//   "USA"
// ];
// const payments = [
//   { name: "Card type", detail: "Visa" },
//   { name: "Card holder", detail: "Mr John Smith" },
//   { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
//   { name: "Expiry date", detail: "04/2024" }
// ];

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
  return (
    newDate.getMonth() +
    1 +
    "/" +
    newDate.getDate() +
    "/" +
    newDate.getFullYear()
  );
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
