import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import "./style.css";
//
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
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

// const ranges = [
//   {
//     value: "Garage",
//     label: "Garage"
//   },
//   {
//     value: "Street",
//     label: "Street"
//   },
//   {
//     value: "Private Lot",
//     label: "Private Lot"
//   },
//   {
//     value: "Driveway",
//     label: "Driveway"
//   }
// ];

const steps = ["Listing Address", "Availability", "Review Your Listing"];

class AddListing extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
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
      activeStep: 0,
      selectedDays: [],
      //errors
      titleError: "",
      parkingtypeError: "",
      priceError: "",
      addressError: "",
      cityError: "",
      stateError: "",
      zipcodeError: ""
    };
  }

  getStepContent = step => {
    console.log(step);
    switch (step) {
      case 0:
        return (
          <AddressForm
            {...this.state}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            validate={this.validate}
          />
        );
      case 1:
        return (
          <PaymentForm
            {...this.state}
            // selectedDays={this.state.selectedDays}
            handleDayClick={this.handleDayClick}
            handleFormSubmit={this.handleFormSubmit}
          />
        );
      case 2:
        return (
          <Review {...this.state} handleFormSubmit={this.handleFormSubmit} />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  handleNext = () => {
    if (!this.validate()) {
      return;
    } else {
      this.setState({
        activeStep: this.state.activeStep + 1
      });
    }
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  componentDidMount() {
    console.log(this.state);
    this.userInfo();
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState(
      {
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
      },
      () => {
        this.props.history.push("/profile");
      }
    );
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
      titleError = "title cannot be empty";
    }
    if (!this.state.parkingtype) {
      parkingtypeError = "please select a type";
    }
    if (isNaN(this.state.price) || !this.state.price) {
      priceError = "price cannot be empty";
    }
    if (!this.state.address) {
      addressError = "password cannot be empty";
    }
    if (!this.state.city) {
      cityError = "city cannot be empty";
    }
    if (!this.state.state) {
      stateError = "state cannot be empty";
    }
    if (isNaN(this.state.zipcode) || !this.state.zipcode) {
      zipcodeError = "zip cannot be empty";
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
    console.log(this.state.selectedDays);
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
                          // this.handleClickOpen();
                          this.handleClose();
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
    const { classes } = this.props;
    // const { activeStep } = this.state;

    return (
      <div>
        <Nav />
        <React.Fragment>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Create New Listing
              </Typography>
              <Stepper
                activeStep={this.state.activeStep}
                className={classes.stepper}
              >
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {this.state.activeStep === steps.length ? (
                  <React.Fragment></React.Fragment>
                ) : (
                  <React.Fragment>
                    {console.log(this.state.activeStep)}
                    {this.getStepContent(this.state.activeStep)}
                    <div className={classes.buttons}>
                      {this.state.activeStep !== 0 && (
                        <Button
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={
                          this.state.activeStep === 2
                            ? this.handleFormSubmit
                            : this.handleNext
                        }
                        className={classes.button}
                      >
                        {this.state.activeStep === steps.length - 1
                          ? "Confirm Listing"
                          : "Next"}
                      </Button>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>

            <Dialog
              open={this.state.open}
              handleClickOpen={this.handleClickOpen}
            >
              <DialogTitle id="form-dialog-title">Listing Summary</DialogTitle>
              <DialogContent>
                {" "}
                <Typography>Listing is created successfully!</Typography>
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={() => this.handleClose()}
                  color="secondary"
                  variant="outlined"
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </main>
        </React.Fragment>
      </div>
    );
  }
}

AddListing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddListing);
