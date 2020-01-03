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

class ListingCard extends React.Component {
  state = {
    open: false,
    title: this.props.title,
    address: this.props.address,
    city: this.props.city,
    state: this.props.state,
    zipcode: this.props.zipcode,
    currentModalId: this.props.id,
    //Material UI card
    expanded: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInputChange = event => {
    let value = event.target.value;
    let name = event.target.name;
    console.log(event.target.value);
    this.setState({
      [name]: value
    });
  };

  handleListingUpdate = event => {
    // event.preventDefault();
    API.editListing(this.state)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    console.log(this.state);
    console.log(this.props);
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
          <Typography component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
          {/* <DeleteIcon className={classes.icon} /> */}
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            aria-label="Edit Listing"
            onClick={() => this.handleClickOpen()}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Edit Availability"
            onClick={event => this.props.handleAvailListing(event)}
          >
            <DateRangeIcon />
          </IconButton>
          <IconButton aria-label="Delete Listing">
            <DeleteIcon />
          </IconButton>
        </CardActions>
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
          </DialogActions>
        </Dialog>
      </Card>
    );
  }
}

ListingCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListingCard);
