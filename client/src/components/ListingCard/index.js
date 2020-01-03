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
import API from "../../utils/API";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class ListingCard extends React.Component {
  state = {
    open: false,
    open2: false,
    title: this.props.title,
    address: this.props.address,
    city: this.props.city,
    state: this.props.state,
    zipcode: this.props.zipcode,
    currentModalId: this.props.id

  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickOpen2 = () => {
    this.setState({ open2: true });
  };


  handleClose = () => {
    this.setState({ open: false });
  };

  handleClose2 = () => {
    this.setState({ open2: false });
  };

  handleInputChange = event => {
    // let { name, value } = event.target;

    let value = event.target.value;
    let name = event.target.name;
    console.log(event.target.value)
    this.setState({
      [name]: value 
    });
  };

  handleListingUpdate = event => {
    // event.preventDefault();
    API.editListing(this.state)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

handleDelete = id => {
  API.deleteListing(id)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

  render() {
    console.log(this.state)
    console.log(this.props)
    return (
      <div className="card" {...this.props} tabIndex="0">
        <div className="card-header">
          <div className="row">
            <div className="card-title">{this.props.title}</div>
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
            onClick={() => this.handleClickOpen2()}
          >
            Edit Avail
          </Button>
          

          <Dialog open={this.state.open} handleClickOpen={this.handleClickOpen}>
            <DialogTitle id="form-dialog-title">Edit Listing</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText> */}
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
              <Button onClick={() => this.handleDelete(this.state.currentModalId)} color="danger">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={this.state.open2} handleClickOpen={this.handleClickOpen2}>
            <DialogActions>
            {/* <Button onClick={() => this.handleListingUpdate()} color="primary">
                Submit
              </Button> */}
              <Button onClick={() => this.handleClose2()} color="secondary">
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
