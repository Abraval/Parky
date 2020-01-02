import React from "react";
import "./style.css";
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogTitle, DialogContentText, DialogContent, TextField, DialogActions, Button} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  root: {

    '& > *': {
      margin: theme.spacing(1),
    },
  },
  dialog: {
    backgroundColor: "red"
  }
}));

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

        <div className="card-footer">
        <Button variant="contained" color="primary" onClick={() => setOpen(true)} >Edit Listing</Button>
        <Button variant="contained" color="primary" onClick={event => props.handleAvailListing(event)} >Edit Availability</Button>
        </div>
        <Dialog open={open}>
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent className={classes.dialog}>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
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
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          
        </DialogActions>
        </Dialog>
      </div>
  );
}

export default ListingCard;