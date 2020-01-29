import React, { Component } from "react";
import Nav from "../../components/Nav";
import "./style.css";
import axios from "axios";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import API from "../../utils/API";
import moment from "moment";
// Material UI Grid Layout imports
import PropTypes, { func } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//Material Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Material UI Card Imports
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
//Material UI Search Bar Imports
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
//Material UI Grid List
import GridList from "@material-ui/core/GridList";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Loader from "../../components/Loader";
//Material UI Popover
import Popover from "@material-ui/core/Popover";
import DateRangeIcon from "@material-ui/icons/DateRange";
import RoomIcon from "@material-ui/icons/Room";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "6px 0"
  },
  searchBar: {
    padding: "2px 4px",
    margin: "8px",
    display: "flex",
    alignItems: "center",
    width: "400px"
  },
  dateBar: {
    padding: "2px 4px",
    margin: "8px 0px",
    display: "flex",
    alignItems: "center",
    width: "200px"
  },
  paper: {
    padding: "8px 10px",
    margin: "auto",
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%"
  },
  searchPaper: {
    padding: "8px 10px",
    margin: "auto",
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
    display: "flex",
    justifyContent: "center"
  },
  card: {
    width: "100%",
    margin: "8px"
  },
  container: {
    paddingTop: "8px",
    paddingLeft: "8px",
    paddingRight: "8px"
  },
  calendar: {
    marginRight: "4px"
  },
  calendarContainer: {
    minWidth: "250px"
  },
  bookingContainer: {
    minWidth: "400px",
    marginLeft: "30px",
    marginTop: "10px"
  },
  mapContainer: {
    minWidth: "400px",
    marginRight: "30px",
    marginTop: "10px"
  },
  image: {
    width: 180,
    height: 180
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
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  typography: {
    margin: theme.spacing.unit * 2
  },
  error: {
    textAlign: "center",
    marginTop: "3px"
  }
});

class SearchResult extends Component {
  state = {
    //Dialog
    open: false,
    currentModalId: this.props.id,
    //end Dialog
    addressQuery: "",
    latitude: 39.952309,
    longitude: -75.163856,
    selectedDays: [],
    markerData: [],
    cardsArray: [],
    idToBook: "",
    user: {},
    address: "",
    searchState: false,
    photo: "",
    title: "",
    href: "",
    city: "",
    state: "",
    zipcode: "",
    price: "",
    id: "",
    fullWidth: true,
    maxWidth: "sm",
    buttonClicked: false,
    isFetching: false,
    anchorEl: null
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  handleClickOpen = (id, address, title, href, city, state, zipcode, price) => {
    this.setState({
      open: true,
      title: title,
      address: address,
      href: href,
      city: city,
      state: state,
      zipcode: zipcode,
      price: price,
      id: id
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handlePopClose = () => {
    this.setState({
      anchorEl: null
    });
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
    if (props.searchState === true) {
      this.renderMap();
    }

    if (this.state.markerData !== props.markerData) {
      // console.log("componentDidUpdate called");
      // this.renderMap();
    }
  }

  handleBookClick = (id, address, title, href, city, state, zipcode, price) => {
    this.setState({
      title: title,
      address: address,
      href: href,
      city: city,
      state: state,
      zipcode: zipcode,
      price: price,
      id: id
    });

    for (var i = 0; i < this.state.selectedDays.length; i++) {
      API.updateAvailability({
        date: this.state.selectedDays[i],
        listing: id,
        userId: this.state.user._id,
        address: address + ", " + city + ", " + state + " " + zipcode,
        title: title,
        price: price,
        photo: href
      }).then(res => console.log(res));
    }
    this.getAddress();
    this.handleClose();
  };

  handleDialogOpen = event => {
    this.handleClickOpen();
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
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
    this.setState({ buttonClicked: false });
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({ searchState: false });

    this.setState({
      [name]: value
    });
  };

  checkForAddress = () => {
    this.setState({ buttonClicked: true });

    if (this.state.addressQuery) {
      this.getAddress();

      this.setState({ isFetching: true });
    }
  };

  handleSubmitSearch = e => {
    e.preventDefault();

    this.setState({ searchState: true });

    this.checkForAddress();
  };

  findRelevantListings = () => {
    const formattedDates = this.state.selectedDays.map(date =>
      date.toISOString()
    );

    this.setState({ cardsArray: [] });
    this.setState({ markerData: [] });
    this.setState({ listings: [] });

    API.getAvailableListings(formattedDates).then(res => {
      let emptyArr = []; // these are the items that we are displaying
      const datesLength = formattedDates.length;
      for (let i = 0; i < res.data.length; i++) {
        let count = 0;
        for (let j = 0; j < res.data.length; j++) {
          if (res.data[i].listing === res.data[j].listing) {
            count++;
            if (
              count == datesLength &&
              emptyArr.findIndex(x => x.listing === res.data[i].listing) === -1
            ) {
              emptyArr.push(res.data[i]);
            }
          }
        }
      }

      console.log("356: " + emptyArr.length);
      if (emptyArr.length === 0) {
        this.setState({
          isFetching: false
        });
      }

      /******************************************Start******************************************/

      const promiseArray = emptyArr.map(item => {
        return new Promise((resolve, reject) => {
          return resolve(
            API.getListingById(item.listing).then(listing => {
              var longLatArray = [this.state.longitude, this.state.latitude];

              API.getListingByIdAndProximity(longLatArray).then(item => {
                for (let i = 0; i < item.data.length; i++) {
                  if (listing.data[0]._id === item.data[i]._id) {
                    this.setState({
                      cardsArray: [...this.state.cardsArray, [item.data[i]]],
                      isFetching: false
                    });
                  }
                }
              });

              const data = listing.data[0];

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
            })
          );
        });
      });

      Promise.all(promiseArray).then(() => {
        this.initMap();
        console.log("promise callback is invoked");
      });

      /******************************************End******************************************/
    });
  };

  renderMap = () => {
    console.log("renderMap");
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    console.log("initMap");

    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: this.state.latitude, lng: this.state.longitude },
      zoom: 15
    });

    // Create An InfoWindow
    var infoWindow = new window.google.maps.InfoWindow(),
      marker,
      i;
    // We will need to change this
    var contentString = this.state.address;

    for (let i = 0; i < this.state.cardsArray.length; i++) {
      let latitude = this.state.cardsArray[i][0].location.coordinates[1];
      let longitude = this.state.cardsArray[i][0].location.coordinates[0];

      var position = new window.google.maps.LatLng(latitude, longitude);

      marker = new window.google.maps.Marker({
        position: position,
        icon: "https://img.icons8.com/color/40/000000/car.png",
        map: map,
        title: this.state.cardsArray[i][0].title
      });

      // Allow each marker to have an info window
      window.google.maps.event.addListener(
        marker,
        "click",
        ((marker, i) => {
          return () => {
            infoWindow.setContent(
              "<img width='100px' src=" +
                this.state.cardsArray[i][0].photo +
                " />" +
                "</br>" +
                "<span style='margin-top:10px;color:black;font-weight:bold;font-size:14px;'>" +
                (i + 1) +
                ". " +
                "<span/>" +
                "<span>" +
                this.state.cardsArray[i][0].title +
                "</span>" +
                "</br>" +
                "<p style='font-weight:normal;font-size:12px;'> $" +
                this.state.cardsArray[i][0].price +
                " / day" +
                "</p>" +
                "<p style='margin-bottom:0px;font-weight:normal;font-size:12px;'> Type: " +
                this.state.cardsArray[i][0].parkingtype +
                "</p>"
            );
            infoWindow.open(map, marker);
          };
        })(marker, i)
      );
    }

    var circle = new window.google.maps.Circle({
      map: map,
      radius: 900, // 10 miles in metres
      fillColor: "#FFF4B8",
      strokeColor: "#FF0000",
      strokeWeight: 0.5,
      center: { lat: this.state.latitude, lng: this.state.longitude }
    });
  };

  getAddress = async () => {
    console.log("getAddress async is called");
    let location = this.state.addressQuery;
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
        this.setState({ latitude, longitude }, () => {
          this.findRelevantListings();
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <Nav />
        <div className={classes.root}>
          <Grid item xs={12}>
            <Paper className={classes.searchPaper} elevation={0}>
              <form onSubmit={this.handleSubmitSearch}>
                <Paper className={classes.searchBar} elevation={1}>
                  <IconButton
                    className={classes.iconButton}
                    aria-label="Search"
                    type="submit"
                    id="queryAddress"
                    disabled="true"
                  >
                    <RoomIcon />
                  </IconButton>
                  <InputBase
                    className={classes.input}
                    placeholder="Where?"
                    type="search"
                    name="addressQuery"
                    value={this.state.addressQuery}
                    onChange={this.handleInputChange}
                    disabled={false}
                  />
                </Paper>
                {this.state.addressQuery.length === 0 &&
                this.state.buttonClicked === true ? (
                  <div style={{ color: "red", fontFamily: "Roboto" }}>
                    Please provide a valid address
                  </div>
                ) : (
                  " "
                )}
              </form>

              <form onClick={this.handleClick}>
                <Paper className={classes.dateBar} elevation={1}>
                  <IconButton
                    className={classes.iconButton}
                    aria-label="Search"
                    type="submit"
                    disabled="true"
                  >
                    <DateRangeIcon />
                  </IconButton>
                  <InputBase
                    className={classes.input}
                    placeholder={
                      this.state.selectedDays.length === 0
                        ? "When?"
                        : "Date(s) Selected!"
                    }
                    type="search"
                    disabled={false}
                  />
                </Paper>
                {this.state.selectedDays.length === 0 &&
                this.state.addressQuery.length > 0 &&
                this.state.buttonClicked === true ? (
                  <div style={{ color: "red", fontFamily: "Roboto" }}>
                    Please select a date(s)
                  </div>
                ) : (
                  " "
                )}
              </form>
              <Button
                className={classes.searchButton}
                onClick={this.handleSubmitSearch}
              >
                <SearchIcon />
              </Button>

              <Popover
                id="simple-popper"
                open={open}
                anchorEl={anchorEl}
                onClose={this.handlePopClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
              >
                <Typography className={classes.typography}>
                  <div>
                    <DayPicker
                      locale="en"
                      selectedDays={this.state.selectedDays}
                      onDayClick={this.handleDayClick}
                    />
                  </div>
                </Typography>
              </Popover>
            </Paper>
          </Grid>

          <Grid className={classes.container} container spacing={8}>
            <Grid className={classes.bookingContainer} item xs>
              <Paper
                className={classes.paper}
                elevation={0}
                style={{ fontFamily: "Roboto" }}
              >
                <div>
                  <GridList cellHeight={600} className={classes.gridList}>
                    {this.state.isFetching && <Loader />}

                    {!this.state.markerData.length && !this.state.isFetching ? (
                      <h1 className="text-center" style={{ width: "100%" }}>
                        No Spots to Display
                      </h1>
                    ) : (
                      <div id="testing" style={{ width: "100%" }}>
                        {this.state.cardsArray.map((spot, i) => {
                          return (
                            <div>
                              <div className={classes.root}>
                                <Paper className={classes.paper}>
                                  <Grid container spacing={16}>
                                    <Grid item>
                                      <ButtonBase
                                        className={classes.image}
                                        key={spot[0]._id}
                                        title={spot[0].title}
                                        href={spot[0].photo}
                                        street={spot[0].streetName}
                                        neighborhood={spot[0].neighborhood}
                                        id={spot[0]._id}
                                        city={spot[0].city}
                                        state={spot[0].state}
                                        zipcode={spot[0].zipcode}
                                        address={spot[0].address}
                                        price={spot[0].price}
                                        parkingtype={spot[0].parkingtype}
                                        handleBookClick={this.handleBookClick}
                                      >
                                        <img
                                          className={classes.img}
                                          alt="complex"
                                          src={spot[0].photo}
                                        />
                                      </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                      <Grid item xs spacing={16}>
                                        <Grid item xs>
                                          <Typography
                                            gutterBottom
                                            variant="heading"
                                            style={{
                                              paddingTop: "12px",
                                              color: "#545454"
                                            }}
                                          >
                                            {i + 1}. {spot[0].title}
                                          </Typography>
                                          <Typography gutterBottom>
                                            {spot[0].streetName}
                                          </Typography>
                                          <Typography color="textSecondary">
                                            {spot[0].neighborhood}
                                          </Typography>
                                          <Typography color="textSecondary">
                                            {spot[0].parkingtype}
                                          </Typography>
                                        </Grid>
                                        <Grid item>
                                          <Button
                                            variant="outlined"
                                            color="primary"
                                            aria-label="Booking Summary"
                                            className={classes.button}
                                            onClick={event => {
                                              event.preventDefault();
                                              this.handleClickOpen(
                                                spot[0]._id,
                                                spot[0].address,
                                                spot[0].title,
                                                spot[0].photo,
                                                spot[0].city,
                                                spot[0].state,
                                                spot[0].zipcode,
                                                spot[0].price
                                              );
                                            }}
                                          >
                                            Book Now
                                          </Button>
                                        </Grid>
                                      </Grid>
                                      <Grid item style={{ margin: "10px" }}>
                                        <Typography
                                          variant="subtitle1"
                                          style={{
                                            color: "#DB5461",
                                            fontWeight: "bold",
                                            fontSize: "20px"
                                          }}
                                        >
                                          ${spot[0].price}
                                        </Typography>
                                        <Typography
                                          variant="subtitle1"
                                          style={{ fontSize: "10px" }}
                                        >
                                          per day
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Dialog
                                    open={this.state.open}
                                    handleClickOpen={this.handleClickOpen}
                                    fullWidth={this.state.fullWidth}
                                    maxWidth={this.state.maxWidth}
                                  >
                                    <DialogTitle
                                      id="form-dialog-title"
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        color: "93b7be",
                                        fontFamily: "Roboto"
                                      }}
                                    >
                                      <CheckCircleIcon
                                        style={{
                                          color: "93b7be",
                                          width: 75,
                                          height: 75,
                                          marginTop: 20
                                        }}
                                      />
                                    </DialogTitle>
                                    <DialogContent
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        fontFamily: "Roboto"
                                      }}
                                    >
                                      <Typography
                                        style={{
                                          color: "#93b7be",
                                          fontSize: 20,
                                          fontWeight: "bold"
                                        }}
                                      >
                                        BOOKING CONFIRMATION
                                      </Typography>
                                      <Card
                                        elevation={0}
                                        style={{
                                          padding: "10px 60px",
                                          border: "1px solid  #93b7be",
                                          marginTop: 20
                                        }}
                                      >
                                        <h3 style={{ color: "#545454" }}>
                                          {this.state.title.toUpperCase()}
                                        </h3>
                                        <p>{this.state.address}</p>
                                        <p>
                                          {this.state.city + ", "}
                                          <span>{this.state.state + ", "}</span>
                                          <span>{this.state.zipcode}</span>
                                        </p>
                                        <h3 style={{ color: "#545454" }}>
                                          Dates Booked:
                                        </h3>
                                        <p>
                                          {this.state.selectedDays.map(date => {
                                            return (
                                              <p>
                                                {moment(date).format("LL")}{" "}
                                              </p>
                                            );
                                          })}
                                        </p>
                                        <h3 style={{ color: "#545454" }}>
                                          Total:
                                          <span>
                                            {" "}
                                            $
                                            {this.state.price *
                                              this.state.selectedDays.length}
                                          </span>
                                        </h3>
                                      </Card>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button
                                        onClick={event => {
                                          event.preventDefault();
                                          this.handleBookClick(
                                            this.state.id,
                                            this.state.address,
                                            this.state.title,
                                            this.state.href,
                                            this.state.city,
                                            this.state.state,
                                            this.state.zipcode,
                                            this.state.price
                                          );
                                        }}
                                        variant="outlined"
                                        color="secondary"
                                      >
                                        Confirm Booking
                                      </Button>
                                      <Button
                                        onClick={event => {
                                          event.preventDefault();
                                          this.handleClose();
                                        }}
                                        variant="outlined"
                                        color="primary"
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
                  </GridList>
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
