import React from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import API from "../../utils/API";
// Material UI Cards imports
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CancelIcon from "@material-ui/icons/Cancel";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class ReservCard extends React.Component {
  state = {
    date: this.props.date,
    address: this.props.address,
    title: this.props.title,
    photo: this.props.photo
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={this.props.photo}
          title={this.props.title}
        />
        <CardHeader title={this.props.title} subheader={this.props.address} />
        <CardContent>
          <Typography component="p">Date: {this.props.date}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            aria-label="Cancel Reservation"
            onClick={() => this.handleClickOpen()}
          >
            <CancelIcon /> Cancel
          </IconButton>
        </CardActions>

        {/* // Start Dialog */}
        {/* <Dialog open={this.state.open} handleClickOpen={this.handleClickOpen}>
          <DialogTitle id="form-dialog-title">Edit Listing</DialogTitle>
          <DialogContent>
            <span>Title: </span>
            <TextField
              autoFocus
              margin="dense"
              // id="name"
              name="title"
              // label="Email Address"
              type="text"
              fullWidth
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            <span>Address: </span>
            <TextField
              autoFocus
              margin="dense"
              // id="name"
              name="address"
              // label="Email Address"
              type="text"
              fullWidth
              value={this.state.address}
              onChange={this.handleInputChange}
            />
            <span>City: </span>
            <TextField
              autoFocus
              margin="dense"
              // id="name"
              name="city"
              // label="Email Address"
              type="text"
              fullWidth
              value={this.state.city}
              onChange={this.handleInputChange}
            />
            <span>State: </span>
            <TextField
              autoFocus
              margin="dense"
              // id="name"
              name="state"
              // label="Email Address"
              type="text"
              fullWidth
              value={this.state.state}
              onChange={this.handleInputChange}
            />
            <span>Zipcode: </span>
            <TextField
              autoFocus
              margin="dense"
              // id="name"
              name="zipcode"
              // label="Email Address"
              type="text"
              fullWidth
              value={this.state.zipcode}
              onChange={this.handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleListingUpdate()} color="primary">
              Submit
            </Button>
            <Button onClick={() => this.handleClose()} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog> */}
      </Card>

      // <div className="card" {...this.props} tabIndex="0">
      //   <div className="card-header">
      //     <div className="row">
      //       <div className="card-title">
      //         <h2>{this.props.title}</h2>
      //       </div>
      //       <img
      //         alt={this.props.title}
      //         className="img-fluid"
      //         src={this.props.photo}
      //       />
      //       <h3>{this.props.address}</h3>
      //       <p>Date: {this.props.date}</p>
      //     </div>
      //   </div>

      //   <div className="card-footer">
      //     <Button
      //       variant="contained"
      //       color="primary"
      //       onClick={() => this.handleClickOpen()}
      //     >
      //       Delete reservation
      //     </Button>
      //   </div>
      // </div>
    );
  }
}

ReservCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReservCard);
