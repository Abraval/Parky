import React, { Component } from "react";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import axios from "axios";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
// Material UI Input imports
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const ranges = [
  {
    value: "Garage",
    label: "Garage"
  },
  {
    value: "Street",
    label: "Street"
  },
  {
    value: "Private Lot",
    label: "Private Lot"
  },
  {
    value: "Driveway",
    label: "Driveway"
  }
];

class AddListing extends Component {
  state = {
    title: "",
    parkingtype: "",
    photo: "",
    price: 0,
    address: "",
    city: "",
    state: "",
    zipcode: "",
    user: {},
    fulladdress: "",
    coordinates: {},
    longitude: 0.0,
    latitude: 0.0,
    //errors
    titleError: "",
    parkingtypeError: "",
    priceError: "",
    addressError: "",
    cityError: "",
    stateError: "",
    zipcodeError: ""
  };

  componentDidMount() {
    this.userInfo();
  }

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: []
    };
  }
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      title: "",
      parkingtype: "",
      photo: "",
      price: 0.0,
      address: "",
      city: "",
      state: "",
      zipcode: "",
      titleError: "",
      parkingtypeError: "",
      priceError: "",
      addressError: "",
      cityError: "",
      stateError: "",
      zipcodeError: ""
    });
  };

  //Validation function
  validate = () => {
    let titleError = "";
    let parkingtypeError = "";
    let priceError = "";
    let addressError = "";
    let cityError = "";
    let stateError = "";
    let zipcodeError = "";

    if (!this.state.title) {
      titleError = "can not be blank";
    }
    if (!this.state.parkingtype) {
      parkingtypeError = "pick a parking type";
    }
    if (isNaN(this.state.price) || !this.state.price) {
      priceError = "input a number";
    }
    if (!this.state.address) {
      addressError = "no password provided";
    }
    if (!this.state.city) {
      cityError = "can not be blank";
    }
    if (!this.state.state) {
      stateError = "can not be blank";
    }
    if (isNaN(this.state.zipcode) || !this.state.zipcode) {
      zipcodeError = "invalid zip";
    }
    if (
      titleError ||
      parkingtypeError ||
      priceError ||
      addressError ||
      cityError ||
      stateError ||
      zipcodeError
    ) {
      this.setState({
        titleError,
        parkingtypeError,
        priceError,
        addressError,
        cityError,
        stateError,
        zipcodeError
      });
      return false;
    }

    return true;
  };

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  }

  userInfo = () => {
    axios.get("/user/").then(response => {
      console.log(response.data);
      if (response.data.user) {
        this.setState({
          user: response.data.user
        });
      }
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState(
        {
          fulladdress:
            this.state.address +
            " " +
            this.state.city +
            " " +
            this.state.state +
            " " +
            this.state.zipcode
        },
        () => {
          let location = this.state.fulladdress;
          // console.log(location);

          this.setState(
            {
              fulladdress:
                this.state.address +
                " " +
                this.state.city +
                " " +
                this.state.state +
                " " +
                this.state.zipcode
            },
            () => {
              let location = this.state.fulladdress;
              // console.log(location);

              axios
                .get("https://maps.googleapis.com/maps/api/geocode/json", {
                  params: {
                    address: location,
                    key: "AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo"
                  }
                })
                .then(response => {
                  var latitude = response.data.results[0].geometry.location.lat;
                  var longitude =
                    response.data.results[0].geometry.location.lng;
                  var coordinates = { longitude, latitude };
                  var streetName =
                    response.data.results[0].address_components[1].long_name;
                  var neighborhood =
                    response.data.results[0].address_components[2].long_name;

                  var typeLat = typeof latitude;
                  console.log(typeLat);

                  let apiKey = "AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo";

                  var queryUrl =
                    "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" +
                    latitude +
                    "," +
                    longitude +
                    "&fov=80&heading=70&pitch=0&key=" +
                    apiKey;

                  this.setState(
                    {
                      coordinates: coordinates,
                      longitude: longitude,
                      latitude: latitude,
                      photo: queryUrl
                    },
                    () => {
                      API.saveListing({
                        user: this.state.user._id,
                        title: this.state.title,
                        parkingtype: this.state.parkingtype || "None",
                        photo: this.state.photo,
                        price: this.state.price,
                        address: this.state.address,
                        city: this.state.city,
                        state: this.state.state,
                        zipcode: this.state.zipcode,
                        streetName,
                        neighborhood,
                        location: {
                          coordinates: [longitude, latitude]
                        }
                      })
                        .then(res => {
                          this.state.selectedDays.map(date => {
                            const listingId = res.data._id;

                            API.createAvailability({
                              date,
                              listing: listingId
                              // .map over all selected dates in array and create a new row in the avail collection for each date and include the the the id of listing
                            });
                          });
                          this.handleClickOpen();
                        })
                        .catch(err => console.log(err));
                    }
                  );
                });
            }
          );
        }
      );
    }
  };

  render() {
    console.log(this.state);
    const { classes } = this.props;
    return (
      <div>
        <Nav />

        <Grid
          container
          spacing={8}
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={2}>
            <Paper className={classes.root} elevation={1} mx="auto">
              <form className={classes.container} noValidate autoComplete="off">
                {/* //TITLE */}
                <TextField
                  id="title"
                  label="Title"
                  fullWidth={true}
                  placeholder="Open driveway on quiet street"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                />
                <div style={{ color: "red" }}>{this.state.titleError}</div>

                {/* // PARKING Type */}
                <TextField
                  id="parkingtype"
                  select
                  label="Select"
                  fullWidth={true}
                  className={classes.textField}
                  value={this.state.parkingtype}
                  onChange={this.handleInputChange}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  helperText="Select spot type"
                  margin="normal"
                  name="parkingtype"
                >
                  {ranges.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <div style={{ color: "red" }}>
                  {this.state.parkingtypeError}
                </div>

                {/* // PRICE */}
                <TextField
                  id="price"
                  label="Daily Price"
                  value={this.state.price}
                  onChange={this.handleInputChange}
                  type="number"
                  fullWidth={true}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  name="price"
                  margin="normal"
                  variant="outlined"
                  placeholder="$"
                  name="price"
                />
                <div style={{ color: "red" }}>{this.state.priceError}</div>

                {/* //ADDRESS */}
                <TextField
                  id="address"
                  fullWidth={true}
                  label="Street Address"
                  placeholder="1200 Market Street"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.address}
                  onChange={this.handleInputChange}
                  name="address"
                />
                <div style={{ color: "red" }}>{this.state.addressError}</div>

                {/* //City */}
                <TextField
                  id="city"
                  label="City"
                  fullWidth={true}
                  placeholder="Philadelphia"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.city}
                  onChange={this.handleInputChange}
                  name="city"
                />
                <div style={{ color: "red" }}>{this.state.cityError}</div>

                {/* //State */}
                <TextField
                  fullWidth={true}
                  id="state"
                  label="State"
                  placeholder="PA"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.state}
                  onChange={this.handleInputChange}
                  name="state"
                />
                <div style={{ color: "red" }}>{this.state.stateError}</div>

                {/* //Zip */}
                <TextField
                  id="zipcode"
                  label="Zip"
                  placeholder="19107"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.zipcode}
                  onChange={this.handleInputChange}
                  name="zipcode"
                  fullWidth={true}
                />
                <div style={{ color: "red" }}>{this.state.zipcodeError}</div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={this.handleFormSubmit}
                  id="addListing"
                  fullWidth={true}
                >
                  Add Listing
                </Button>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={2} elevation={1}>
            <Paper>
              <DayPicker
                selectedDays={this.state.selectedDays}
                onDayClick={this.handleDayClick}
              />

              <Dialog
                open={this.state.open}
                handleClickOpen={this.handleClickOpen}
              >
                <DialogTitle id="form-dialog-title">
                  Listing Summary
                </DialogTitle>
                <DialogContent>
                  <Typography>Listing is created successfully!</Typography>
                </DialogContent>

                <DialogActions>
                  <Button
                    onClick={() => this.handleClose()}
                    color="secondary"
                    variant="outlined"
                  >
                    CLose
                  </Button>
                </DialogActions>
              </Dialog>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// export default AddListing;

AddListing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddListing);
