import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

function ListingCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
      <div className="card" {...props} tabIndex="0">
          <div className="card-header">
            <div className="row">
              <div className="card-title">{props.title}</div>
            </div>
          </div>
          <div className="card-body">
          <img className="photo img-fluid" src={props.photo}/>
          <p className="adress">{props.address}</p>
          <p className="city">{props.city}</p>
          <p className="state">{props.state}</p>
          <p className="zipcode">{props.zipcode}</p>
          </div>
        </div>
        <div className="card-body">
          <img className="photo img-fluid" src={this.props.photo} />
          <p className="adress">{this.props.address}</p>
          <p className="city">{this.props.city}</p>
          <p className="city">{this.props.state}</p>
          <p className="zipcode">{this.props.zipcode}</p>
        </div>

        <div className="card-footer">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleClickOpen()}
          >
            Edit Listing
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={event => this.props.handleAvailListing(event)}
          >
            Edit Avail
          </Button>
          <Dialog open={this.state.open} handleClickOpen={this.handleClickOpen}>
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default ListingCard;
