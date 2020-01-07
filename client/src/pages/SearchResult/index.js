import React, { Component } from "react";
import Nav from "../../components/Nav";
import "./style.css";
import axios from "axios";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import API from "../../utils/API";
import { ListingList, ListingListItem } from "../../components/ListingList";
import moment from "moment";
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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import { unstable_Box as Box } from '@material-ui/core/Box';

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
    title: "",
    href: "",
    city: "",
    state: "",
    zipcode: "",
    price: "",
    id: "",
    fullWidth: true,
    maxWidth: "sm",
    buttonClicked: false
    // availId: ""
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

  componentDidMount() {

    // window.highlightCorrespondingCard = this.highlightCorrespondingCard; 

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

  componentWillUnmount() {
    // window.highlightCorrespondingCard = null; 
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
      // console.log("componentDidUpdate called");
      this.renderMap();
    
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
    // console.log(address);

    // console.log("---------------------");

    // console.log("selectedDaysLength: ", this.state.selectedDays.length);
    // console.log("id: ", id);
    // console.log("user id: ", this.state.user._id);
    // console.log("address: ", address);
    // console.log("city: ", city);
    // console.log("state: ", state);
    // console.log("zipcode: ", zipcode);
    // console.log("title: ", title);
    // console.log("price: ", price);
    // console.log("href: ", href);

    // console.log("---------------------");
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
    // this.highlightCorrespondingCard = this.highlightCorrespondingCard.bind(this); 
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

    this.setState({
      [name]: value
    });
  };
  handleSubmitSearch = e => {
    // console.log("handleSubmitSearch is called");

    e.preventDefault();

    this.getAddress();

    this.setState({ buttonClicked: true });

    // console.log(this.state.selectedDays.length);

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
    console.log("addres.then(data => is called");

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
              emptyArr.findIndex(x => x.listing === res.data[i].listing) === -1
            ) {
              emptyArr.push(res.data[i]);
            }
          }
        }
      }

      /******************************************Start******************************************/

      // console.log("API.getAvailableListings Called");

      emptyArr.map(item => {
        API.getListingById(item.listing).then(listing => {

          // console.log("API.getListingByID Called");

          var longLatArray = [this.state.longitude, this.state.latitude];

          console.log(longLatArray);

          API.getListingByIdAndProximity(longLatArray).then(item => {

            // console.log("API.getListingByIdAndProximity");

            // console.log("this.state.cardsArray: ", this.state.cardsArray);

            // console.log("line 250 is: ", item);

            for (let i = 0; i < item.data.length; i++) {
              // console.log(listing.data[0]._id === item.data[i]._id);
              if (listing.data[0]._id === item.data[i]._id) {
                this.setState({
                  cardsArray: [...this.state.cardsArray, [item.data[i]]]
                }, () => this.initMap());
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
          
        });
      });

      /******************************************End******************************************/
    });

    // this.renderMap();
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
      zoom: 15
    });

    // Create An InfoWindow
    var infoWindow = new window.google.maps.InfoWindow(),
      marker,
      i;
    // We will need to change this
    var contentString = this.state.address;



/***********************************START ******************************************/

for (let i = 0; i < this.state.cardsArray.length; i++) {

  // console.log(this.state.cardsArray); 
  // console.log(this.state.cardsArray[i][0].location.coordinates[1])
  // console.log(this.state.cardsArray[i][0].location.coordinates[0])

  let latitude = this.state.cardsArray[i][0].location.coordinates[1]; 
  let longitude = this.state.cardsArray[i][0].location.coordinates[0]; 

  // Find equivalent
  console.log(this.state.markerData[i]); 
  console.log(this.state.cardsArray[i][0].title); 
  console.log(this.state.cardsArray[i][0]);

  // image source 
  console.log(this.state.cardsArray[i][0].photo); 

  // listing title 
  console.log(this.state.cardsArray[i][0].title); 

  // parking type 
  console.log(this.state.cardsArray[i][0].parkingtype); 


  var position = new window.google.maps.LatLng(
    latitude,
    longitude
  );

  // "<button " + "onclick=window.highlightCorrespondingCard()" + ">Book Now</button>

  // Title below in marker was originally address

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
        console.log(this.state.markerData[i][7]); 

        // let listingId = this.state.markerData[i][7]; 

        // this is how I was passing through the id of the corresponding marker 
        // this.highlightCorrespondingCard(listingId); 

        infoWindow.setContent("<img width='100px' src=" + this.state.cardsArray[i][0].photo + " />" + "</br>" + "<span style='margin-top:10px;color:black;font-weight:bold;font-size:14px;'>"+ (i + 1) + ". " +"<span/>" + "<span>" + this.state.cardsArray[i][0].title + "</span>" + "</br>" + "<p style='font-weight:normal;font-size:12px;'> Price: $" + this.state.cardsArray[i][0].price + "</p>" + "<p style='margin-bottom:0px;font-weight:normal;font-size:12px;'> Type: " + this.state.cardsArray[i][0].parkingtype + "</p>");
        infoWindow.open(map, marker);
      };
    })(marker, i)
  );


}

/***********************************START ******************************************/



    var circle = new window.google.maps.Circle({
      map: map,
      radius: 800, // 10 miles in metres
      fillColor: "#FFF4B8",
      strokeColor: "#FF0000",
      strokeWeight: 0.5,
      center: { lat: this.state.latitude, lng: this.state.longitude }
    });
    console.log(marker);

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
        // console.log(
        //   "Axios.get.then is called, setting state of latitude and longitude for the map"
        // );
        var latitude = response.data.results[0].geometry.location.lat;
        var longitude = response.data.results[0].geometry.location.lng;
        this.setState({ latitude, longitude }, () => {
          // console.log(
          //   "inside the callback for this.setState latitude and longitude"
          // );
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

                {this.state.selectedDays.length === 0 &&
                this.state.addressQuery.length > 0 &&
                this.state.buttonClicked === true ? (
                  <span style={{ color: "red", fontFamily: "Roboto" }}>
                    Please select date(s)
                  </span>
                ) : (
                  " "
                )}

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
                      {this.state.cardsArray.map( (spot, i ) => {
                        // console.log("SPOT ARRAY ++++++++++++++");
                        // console.log(spot);
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
                                      // handleDialogOpen={this.handleDialogOpen}
                                    >
                                      <img
                                        className={classes.img}
                                        alt="complex"
                                        src={spot[0].photo}
                                      />
                                    </ButtonBase>
                                  </Grid>
                                  <Grid item xs={12} sm container>
                                    <Grid  item xs spacing={16}>
                                      <Grid  item xs>
                                      <Typography
                                          gutterBottom
                                          variant="subtitle1"
                                        >
                                          {i + 1}
                                        </Typography>
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
                                            this.handleClickOpen(
                                              spot[0]._id,
                                              spot[0].address,
                                              spot[0].title,
                                              spot[0].photo,
                                              spot[0].city,
                                              spot[0].state,
                                              spot[0].zipcode,
                                              spot[0].price *
                                                this.state.selectedDays.length
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
                                    <Card elevation={0} style={{ padding: "10px 60px", border: "1px solid  #93b7be", marginTop: 20}}>
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
                                          <p>{moment(date).format("LL")} </p>
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
