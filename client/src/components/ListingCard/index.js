import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormDialog from "../Dialog";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

function ListingCard(props) {
  const { classes } = props;

  return (
    <div className="card" {...props} tabIndex="0">
      <div className="card-header">
        <div className="row">
          <div className="card-title">{props.title}</div>
        </div>
      </div>
      <div className="card-body">
        <img className="photo img-fluid" src={props.photo} />
        <p className="adress">{props.address}</p>
        <p className="city">{props.city}</p>
        <p className="city">{props.state}</p>
        <p className="zipcode">{props.zipcode}</p>
      </div>

      <div className="card-footer">
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.handleClickOpen()}
        >
          Edit Listing
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={event => props.handleAvailListing(event)}
        >
          Edit Availability
        </Button>
      </div>

      <FormDialog></FormDialog>
    </div>
  );
}

export default ListingCard;
