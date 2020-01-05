import React, { Component } from "react";
import Nav from "../../components/Nav";
import "./style.css";
import axios from "axios";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import API from "../../utils/API";
import { ListingList, ListingListItem } from "../../components/ListingList";
// Material UI Grid Layout imports
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
//Material Dialog
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//end Dialog
// Material UI Card Imports
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 1,
    margin: "auto",
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%"
  },
  card: {
    width: "100%"
  },
  container: {
    paddingTop: "8px",
    paddingLeft: "8px",
    paddingRight: "8px"
  },
  calendarContainer: {
    minWidth: "250px"
  },
  bookingContainer: {
    minWidth: "400px"
  },
  mapContainer: {
    minWidth: "400px"
  },
  // media: {
  //   height: 140
  // },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class SearchResult extends Component {
  state = {
    //Dialog
    open: false,
    currentModalId: this.props.id,
    //end Dialog
    addressQuery: "",
    latitude: 39.952583,
    longitude: -75.165222,
    selectedDays: [],
    markerData: [],
    idToBook: "",
    user: {},
    address: "",
    photo: "",
    title: ""
    // availId: ""
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  handleClickOpen = (id, address, title, href, city, state, zipcode) => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.renderMap();

    this.userInfo().then(response =>
      this.setState(
        {
          user: response.data.user
        },
        () => this.tester()
      )
    );
  }

  tester() {
    console.log(this.state.user);
  }

  userInfo() {
    return axios.get("/user/");
  }
  componentDidUpdate(prevProps, props) {
    if (this.state.markerData !== props.markerData) {
      this.renderMap();
      // this.renderCards();
    }
  }

  handleBookClick = (id, address, title, href, city, state, zipcode) => {
    console.log(address);
    for (var i = 0; i < this.state.selectedDays.length; i++) {
      API.updateAvailability({
        date: this.state.selectedDays[i],
        listing: id,
        userId: this.state.user._id,
        address: address + ", " + city + ", " + state + " " + zipcode,
        title: title,
        photo: href
      });
    }
    this.handleClose();
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleBookClick = this.handleBookClick.bind(this);
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;

    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay => {
        DateUtils.isSameDay(selectedDay, day);
      });
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmitSearch = e => {
    e.preventDefault();
    console.log("handleSubmitSearch");
    const address = this.getAddress();

    let a = this.state.selectedDays.map(i => {
      // console.log(i);
      // console.log(b);
    });

    // console.log(a);

    address.then(data => {
      const formattedDates = this.state.selectedDays.map(date =>
        date.toISOString()
      );

      // console.log(formattedDates);
      this.setState({ markerData: [] });
      this.setState({ listings: [] });

      API.getAvailableListings(formattedDates).then(res => {
        console.log("here", res);

        let emptyArr = []; // these are the items that we are displaying

        const datesLength = formattedDates.length;

        for (let i = 0; i < res.data.length; i++) {
          let count = 0;
          for (let j = 0; j < res.data.length; j++) {
            // console.log(res.data[i].listing === res.data[j].listing);
            if (res.data[i].listing === res.data[j].listing) {
              count++;
              // console.log(count);
              // console.log(emptyArr.findIndex(x => x.listing === res.data[i].listing) === -1);

              if (
                count == datesLength &&
                emptyArr.findIndex(x => x.listing === res.data[i].listing) ===
                  -1
              ) {
                emptyArr.push(res.data[i]);
              }
            }
          }
        }

        // console.log(emptyArr);

        emptyArr.map(item => {
          console.log("item is", item);
          API.getListingById(item.listing).then(listing => {
            console.log("search lat is ", this.state.latitude);
            console.log("search lat is ", this.state.longitude);

            var longLatArray = [this.state.longitude, this.state.latitude];

            console.log("listing here", listing.data[0]);
            // API.getListingByIdAndProximity(longLatArray).then(data => {
            //   console.log("line 229 is: ", data);
            // });

            // console.log("listing here", listing);
            // Set this.state.markerData here.
            const data = listing.data[0];
            // console.log(data._id);
            this.setState({
              markerData: [
                ...this.state.markerData,
                [
                  data.address,
                  data.location.coordinates[1],
                  data.location.coordinates[0],
                  data.title,
                  data.streetName,
                  data.neighborhood,
                  data.photo,
                  data._id,
                  data.city,
                  data.state,
                  data.zipcode,
                  data.price,
                  data.parkingtype
                ]
              ]
            });
          });
        });

        // emptyArr.map(item => {

        //   // console.log("item is", item);

        //   console.log(this.state.latitude);
        //   console.log(this.state.longitude);

        //   API.getListingByIdAndProximity(item.listing).then(listing => {
        //     console.log(listing);
        //   })

        // });
      });
    });
  };

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo&callback=initMap"
    );
    window.initMap = this.initMap;
    // console.log(this.state.markerData);
  };

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: this.state.latitude, lng: this.state.longitude },
      zoom: 16
    });

    // Create An InfoWindow
    var infoWindow = new window.google.maps.InfoWindow(),
      marker,
      i;

    // We will need to change this
    var contentString = this.state.address;

    for (i = 0; i < this.state.markerData.length; i++) {
      var position = new window.google.maps.LatLng(
        this.state.markerData[i][1],
        this.state.markerData[i][2]
      );
      // bounds.extend(position);
      // console.log("position", position);
      marker = new window.google.maps.Marker({
        position: position,
        map: map,
        title: this.state.markerData[i][0]
      });

      // Allow each marker to have an info window
      window.google.maps.event.addListener(
        marker,
        "click",
        (function(marker, i) {
          return function() {
            // infoWindow.setContent(infoWindow[i][0]);
            infoWindow.open(map, marker);
          };
        })(marker, i)
      );
    }
  };

  getAddress = async () => {
    let location = this.state.addressQuery;

    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: location,
          key: "AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo"
        }
      })
      .then(response => {
        // console.log(response);
        var latitude = response.data.results[0].geometry.location.lat;
        var longitude = response.data.results[0].geometry.location.lng;
        this.setState({ latitude, longitude });
        // this.renderMap();
      });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    return (
      <div>
        <Nav />
        <div className={classes.root}>
          <Grid className={classes.container} container spacing={8}>
            <Grid className={classes.calendarContainer} item xs sm={2}>
              <Paper className={classes.paper} elevation={0}>
                <form onSubmit={this.handleSubmitSearch}>
                  <input
                    type="text"
                    name="addressQuery"
                    value={this.state.address}
                    onChange={this.handleInputChange}
                    placeholder="Search for your address here"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="queryAddress"
                  >
                    Search
                  </button>
                </form>
                <div>
                  <DayPicker
                    locale="en"
                    selectedDays={this.state.selectedDays}
                    onDayClick={this.handleDayClick}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid className={classes.bookingContainer} item xs>
              <Paper className={classes.paper} elevation={0}>
                <div>
                  {!this.state.markerData.length ? (
                    <h1 className="text-center">No Spots to Display</h1>
                  ) : (
                    <div>
                      {this.state.markerData.map(spot => {
                        // console.log(spot, this.handleBookClick);
                        return (
                          <div>
                            <div className={classes.root}>
                              <Paper className={classes.paper}>
                                <Grid container spacing={16}>
                                  <Grid item>
                                    <ButtonBase
                                      className={classes.image}
                                      key={spot[3]}
                                      title={spot[3]}
                                      href={spot[6]}
                                      street={spot[4]}
                                      neighborhood={spot[5]}
                                      id={spot[7]}
                                      city={spot[8]}
                                      state={spot[9]}
                                      zipcode={spot[10]}
                                      address={spot[0]}
                                      price={spot[11]}
                                      parkingtype={spot[12]}
                                      handleBookClick={this.handleBookClick}
                                    >
                                      <img
                                        className={classes.img}
                                        alt="complex"
                                        src={spot[6]}
                                      />
                                    </ButtonBase>
                                  </Grid>
                                  <Grid item xs={12} sm container>
                                    <Grid
                                      item
                                      xs
                                      container
                                      direction="column"
                                      spacing={16}
                                    >
                                      <Grid item xs>
                                        <Typography
                                          gutterBottom
                                          variant="subtitle1"
                                        >
                                          {spot[3]}
                                        </Typography>
                                        <Typography gutterBottom>
                                          {spot[4]}
                                        </Typography>
                                        <Typography color="textSecondary">
                                          {spot[5]}
                                        </Typography>
                                        <Typography color="textSecondary">
                                          {spot[12]}
                                        </Typography>
                                      </Grid>
                                      <Grid item>
                                        <Button
                                          variant="outlined"
                                          color="primary"
                                          className={classes.button}
                                          aria-label="Booking Summary"
                                          onClick={() => this.handleClickOpen(spot[7],
                                            spot[0],
                                            spot[3],
                                            spot[6],
                                            spot[8],
                                            spot[9],
                                            spot[10])}
                                        >
                                          Book Now
                                        </Button>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <Typography variant="subtitle1">
                                        ${spot[11]}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Dialog
                                  open={this.state.open}
                                  handleClickOpen={this.handleClickOpen}
                                >
                                  <DialogTitle id="form-dialog-title">
                                    Your Booking Information
                                  </DialogTitle>
                                  <DialogContent>
                                    <p>Title: {spot[3]}</p>
                                    <p>Address: {spot[0]}</p>
                                    <p>City: {spot[8]}</p>
                                    <p>State: {spot[9]}</p>
                                    <p>Zipcode: {spot[10]}</p>
                                    <p>Parking Type: {spot[12]}</p>
                                    <p>Price: ${spot[11]}</p>
                                    {/* <p>Dates: {this.state.selectedDays}</p> */}
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      className={classes.button}
                                      onClick={event => {
                                        event.preventDefault();
                                        this.handleBookClick(
                                          spot[7],
                                          spot[0],
                                          spot[3],
                                          spot[6],
                                          spot[8],
                                          spot[9],
                                          spot[10]
                                        );
                                      }}
                                    >
                                      Confirm Booking
                                    </Button>
                                    <Button
                                      onClick={() => this.handleClose()}
                                      variant="outlined"
                                      color="secondary"
                                    >
                                      Cancel
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </Paper>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Paper>
            </Grid>
            <Grid className={classes.mapContainer} item xs>
              <Paper className={classes.paper} elevation={0}>
                <main>
                  <div id="map"></div>
                </main>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired
};

function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default withStyles(styles)(SearchResult);
