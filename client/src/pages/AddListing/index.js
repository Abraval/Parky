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
    price: 0.0,
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
    zipcodeError: "",
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

//Validation function
  validate = () => {
    let titleError = "";
    let parkingtypeError = "";
    let priceError = "";
    let addressError =  "";
    let cityError = "";
    let stateError = "";
    let zipcodeError = "";

    if (!this.state.title) {
      titleError = "can not be blank"; 
    }
    if (!this.state.parkingtype) {
      parkingtypeError = "pick a parking type"; 
    }
    if (isNaN(this.state.price) ||  !this.state.price) {
      priceError = "input a number"
    }
    if (!this.state.address) {
      addressError = "no password provided"; 
    }
    if (!this.state.city) {
      cityError = "can not be blank"; 
    }
    if (!this.state.state) {
      stateError = "can not be blank"
    }
    if (isNaN(this.state.zipcode)|| !this.state.zipcode) {
      zipcodeError = "invalid zip";
    }
    if (titleError || parkingtypeError || priceError || addressError ||  cityError || stateError || zipcodeError) {
      this.setState({ titleError, parkingtypeError, priceError, addressError, cityError, stateError, zipcodeError});
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

        axios
          .get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
              address: location,
              key: "AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo"
            }
          })
          .then(response => {
            var latitude = response.data.results[0].geometry.location.lat;
            var longitude = response.data.results[0].geometry.location.lng;
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
                  price: this.state.price || 0,
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
                  })
                  .catch(err => console.log(err));
              }
            );
          });
      }
    );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Nav />

        {/* <form>
            <div className="form-group">
              <label for="title">Title</label>
              <input
                value={this.state.title}
                onChange={this.handleInputChange}
                type="text"
                name="title"
                className="form-control"
                id="title"
                placeholder="Open driveway on quiet street"
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="parkingtype">Parking Type</label>
                <select
                  className="form-control"
                  id="parkingtype"
                  name="parkingtype"
                  value={this.state.parkingtype}
                  onChange={this.handleInputChange}
                >
                  <option></option>
                  <option>Garage</option>
                  <option>Street</option>
                  <option>Private Lot</option>
                  <option>Driveway</option>
                </select>
              </div>

              <div className="form-group col-md-6">
                <label for="price">Price</label>
                <input
                  value={this.state.price}
                  onChange={this.handleInputChange}
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  placeholder="Enter daily price"
                />
              </div>
            </div>
            <div className="form-group">
              <label for="address">Address</label>

              <input
                value={this.state.address}
                onChange={this.handleInputChange}
                type="text"
                className="form-control"
                name="address"
                id="address"
                placeholder="1234 Main St"
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group col-md-4">
                <label for="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={this.state.state}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="zipcode"
                  name="zipcode"
                  value={this.state.zipcode}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-group"></div>
            <button
              type="submit"
              onClick={this.handleFormSubmit}
              className="btn btn-primary"
              id="addListing"
            >
              Add Listing
            </button>
          </form> */}

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
                <div style={{ color: "red" }}>
                      {this.state.titleError}
                    </div>

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
                />
                <div style={{ color: "red" }}>
                      {this.state.priceError}
                    </div>

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
                <div style={{ color: "red" }}>
                      {this.state.addressError}
                    </div>

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
                <div style={{ color: "red" }}>
                      {this.state.cityError}
                    </div>

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
                <div style={{ color: "red" }}>
                      {this.state.stateError}
                    </div>

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
                <div style={{ color: "red" }}>
                {this.state.zipcodeError}
              </div>
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
