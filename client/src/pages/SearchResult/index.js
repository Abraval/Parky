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
//Material UI Search Bar Imports
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "6px 0"
  },
  searchBar: {
    padding: "2px 4px",
    margin: "8px 0",
    display: "flex",
    alignItems: "center"
  },
  paper: {
    padding: theme.spacing.unit * 1,
    margin: "auto",
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%"
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
    minWidth: "400px"
  },
  mapContainer: {
    minWidth: "400px"
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
  }
  // input: {
  //   display: "none"
  // }
});
class SearchResult extends Component {
  state = {
    //Dialog
    open: false,
    currentModalId: this.props.id,
    //end Dialog
    addressQuery: "",
    latitude: 0.0,
    longitude: 0.0,
    selectedDays: [],
    markerData: [],
    cardsArray: [],
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

    // console.log(prevProps); 
    // console.log(props); 
    if (this.state.markerData !== props.markerData) {

      console.log("componentDidUpdate called"); 
      this.renderMap();
      // this.renderCards();
    }
  }
  handleBookClick = (id, address, title, href, city, state, zipcode, price) => {
    // console.log(address);]
   
    console.log("selectedDaysLength: ", this.state.selectedDays.length);
    console.log("id: ", id);
    console.log("user id: ", this.state.user._id);
    console.log("address: ", address);
    console.log("city: ", city);
    console.log("state: ", state);
    console.log("zipcode: ", zipcode);
    console.log("title: ", title);
    console.log("price: ", price);
    console.log("href: ", href);

    console.log("---------------------");
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

    this.handleClickOpen();
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
  }
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };
  handleSubmitSearch = e => {

    console.log("handleSubmitSearch is called"); 

    e.preventDefault();

    this.getAddress();

    /********************** Start of Address Function ********************/



  

    /********************** End of Address Function ********************/

  };

  // functionA = () => {
  //   var listingsPromise = new Promise((resolve, reject) => {
  //     console.log("listing Promise called"); 
  //     resolve(this.findRelevantListings()); 
  //   }) 

  //   listingsPromise.then(res => {

  //     console.log(".then of listing Promise called"); 
  //     this.renderMap(); 

  //   })

  // }



  findRelevantListings = () => {


      console.log("addres.then(data => is called")

      const formattedDates = this.state.selectedDays.map(date =>
        date.toISOString()
      );

      this.setState({ cardsArray: [] });
      this.setState({ markerData: [] });
      this.setState({ listings: [] });

      API.getAvailableListings(formattedDates).then(res => {
        // console.log("here", res);

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

        /******************************************Start******************************************/

        console.log("API.getAvailableListings Called"); 

        emptyArr.map(item => {
          API.getListingById(item.listing).then(listing => {

            console.log("API.getListingByID Called"); 

            var longLatArray = [this.state.longitude, this.state.latitude];

            console.log(longLatArray); 

            API.getListingByIdAndProximity(longLatArray).then(item => {

              console.log("API.getListingByIdAndProximity") 

              console.log("this.state.cardsArray: ", this.state.cardsArray); 
              
              // console.log("line 250 is: ", item);

              for (let i = 0; i < item.data.length; i++) {
                // console.log(listing.data[0]._id === item.data[i]._id);
                if (listing.data[0]._id === item.data[i]._id) {
                  this.setState({
                    cardsArray: [...this.state.cardsArray, [item.data[i]]]
                  });
                }
              }

              console.log("this.state.cardsArray after the for loop ", this.state.cardsArray); 

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

          });
        });

        /******************************************End******************************************/
      });
    
      // this.renderMap(); 
  }




  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo&callback=initMap"
    );
    window.initMap = this.initMap;
    // console.log(this.state.markerData);
  };

  initMap = () => {
    console.log("initMap is called"); 

    // console.log(this.state.latitude);
    // console.log(this.state.longitude);
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

    for (i = 0; i < this.state.markerData.length; i++) {
      var position = new window.google.maps.LatLng(
        this.state.markerData[i][1],
        this.state.markerData[i][2]
      );

      console.log(this.state.markerData[i]);
      // bounds.extend(position);
      // console.log("position", position);
      let iconBase =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
      marker = new window.google.maps.Marker({
        position: position,
        icon: "https://img.icons8.com/color/40/000000/car.png",
        map: map,
        title: this.state.markerData[i][0]
      });
      // Allow each marker to have an info window
      window.google.maps.event.addListener(
        marker,
        "click",
        ((marker, i) => {
          return () => {
            console.log(this.state.markerData[i]);
            infoWindow.setContent(
              "<img width='100px' src=" +
                this.state.markerData[i][6] +
                " />" +
                "</br>" +
                "<p>" +
                this.state.markerData[i][0] +
                "</p>" +
                "<p> Type: " +
                this.state.markerData[i][12] +
                "</p>"
            );
            infoWindow.open(map, marker);
          };
        })(marker, i)
      );
    }

    var circle = new window.google.maps.Circle({
      map: map,
      radius: 500, // 10 miles in metres
      fillColor: "#FFF4B8",
      strokeColor: "#FF0000",
      strokeWeight: 0.5,
      center: { lat: this.state.latitude, lng: this.state.longitude }
    });
    console.log(marker);
    // console.log(marker); 

    // circle.bindTo('center', marker, 'position');
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

        console.log("Axios.get.then is called, setting state of latitude and longitude for the map");
        var latitude = response.data.results[0].geometry.location.lat;
        var longitude = response.data.results[0].geometry.location.lng;
        this.setState({ latitude, longitude }, () => {
          console.log("inside the callback for this.setState latitude and longitude"); 
          // this.renderMap();
          this.findRelevantListings(); 
          // this.functionA(); 
        });
        // this.renderMap();
      });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    // console.log(this.state.markerData);
    // console.log(this.state.cardsArray);
    // console.log(this.state);
    return (
      <div>
        {/* {console.log(this.state.cardsArray)} */}
        <Nav />
        <div className={classes.root}>
          <Grid className={classes.container} container spacing={8}>
            <Grid className={classes.calendarContainer} item width={1 / 4}>
              <Paper className={classes.paper} elevation={0}>
                <form onSubmit={this.handleSubmitSearch}>
                  <Paper className={classes.searchBar} elevation={1}>
                    <InputBase
                      className={classes.input}
                      placeholder="Search for a spot"
                      type="search"
                      name="addressQuery"
                      value={this.state.addressQuery}
                      onChange={this.handleInputChange}
                      disabled={false}
                    />
                    <IconButton
                      className={classes.iconButton}
                      aria-label="Search"
                      type="submit"
                      id="queryAddress"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </form>

                <Paper
                  className={classes.calendar}
                  elevation={0}
                  style={{ fontFamily: "Roboto" }}
                >
                  <div>
                    <DayPicker
                      locale="en"
                      selectedDays={this.state.selectedDays}
                      onDayClick={this.handleDayClick}
                    />
                  </div>
                </Paper>
              </Paper>
            </Grid>
            <Grid className={classes.bookingContainer} item xs>
              <Paper
                className={classes.paper}
                elevation={0}
                style={{ fontFamily: "Roboto" }}
              >
                <div>
                  {!this.state.markerData.length ? (
                    <h1 className="text-center">No Spots to Display</h1>
                  ) : (
                    <div>
                      {this.state.cardsArray.map(spot => {
                        // console.log(spot[0].title);
                        // console.log(this.state.markerData);
                        // console.log(this.state.cardsArray);
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
                                      handleDialogOpen={this.handleDialogOpen}
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
                                          variant="subtitle1"
                                        >
                                          {spot[0].title}
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
                                            this.handleBookClick(
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
                                    <Grid item>
                                      <Typography variant="subtitle1">
                                        ${spot[0].price}
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

                                  <DialogContent
                                   >
                                    <p>Title: {spot[0].title}</p>
                                    <p>Address: {spot[0].address}</p>
                                    <p>City: {spot[0].city}</p>
                                    <p>State: {spot[0].state}</p>
                                    <p>Zipcode: {spot[0].zipcode}</p>
                                    <p>Parking Type: {spot[0].parkingtype}</p>
                                    <p>Price: ${spot[0].price}</p>
                                    {/* <p>Dates: {this.state.selectedDays}</p> */}
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      onClick={() => this.handleClose()}
                                      variant="outlined"
                                      color="secondary"
                                    >
                                      Confirm Booking
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
