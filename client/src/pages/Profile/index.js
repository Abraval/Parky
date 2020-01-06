import React, { Component } from "react";
import moment from "moment";
import ListingCard from "../../components/ListingCard";
import ReservCard from "../../components/ReservCard";
import API from "../../utils/API";
import "./style.css";
import Nav from "../../components/Nav";
// Material UI Grid Layout imports
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// Material UI Tabs imports
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: "8px" }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: "6px"
  },
  paper: {
    padding: theme.spacing.unit * 1,
    margin: "auto",
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%"
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});

class Profile extends Component {
  state = {
    listing: [],
    reserved: [],
    user: {},
    userId: "",
    userName: "",
    // For tabs
    value: 0
  };

  componentDidMount() {
    this.userInfo();
    this.loadListings();
  }

  userInfo = () => {
    API.getUser()
      .then(res => {
        console.log("=======");
        console.log(res);
        console.log("=======");
        this.setState({ user: res.data });
        this.setState({ userId: res.data.user._id });
        this.loadListings();
        this.loadReserved();
      })
      .catch(err => console.log(err));
  };

  tester() {
    console.log("testing user");
    console.log(this.state);
  }

  loadListings = () => {
    API.getListingsForProf()
      .then(res => {
        console.log("Profile.loadListing res.date", res.data);
        this.setState({ listing: res.data });
      })
      .catch(err => console.log(err));
  };

  loadReserved = () => {
    API.getReservForProf(this.state.userId)
      .then(res => {
        this.setState({ reserved:  res.data });
        console.log("RESERVATIONS");
        console.log(res.data);
        // let reservListId =
        // console.log("RESERVATIONS");
        // console.log(res.data);
      })

      .catch(err => console.log(err));
  };

  loadReserved = () => {
    API.getReservForProf(this.state.userId)
      .then(res => {
        this.setState({ reserved:  res.data });
        console.log("RESERVATIONS");
        console.log(res.data);
        // let reservListId =
        // console.log("RESERVATIONS");
        // console.log(res.data);
      })

      .catch(err => console.log(err));
  };
  loadReserved2 = () => {
    API.getReservForProf()
      .then(res => {
        this.setState({ reserved:  res.data });
        console.log("RESERVATIONS");
        console.log(res.data);
        // let reservListId =
        // console.log("RESERVATIONS");
        // console.log(res.data);
      })

      .catch(err => console.log(err));
  };
  
  



  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div>
        <Nav />

        <div className={classes.root}>
          <Grid container spacing={0}>
            <Grid item xs={2}>
              <Paper className={classes.paper} square={true} elevation={0}>
                <h2>Welcome back, {this.state.userName}!</h2>
              </Paper>
            </Grid>

            {/* ////////////////////////////// */}

            <Grid item xs={10}>
              {/* //Begin Tabs Menu// */}
              <Paper className={classes.root} square={true} elevation={0}>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                  variant="fullWidth"
                >
                  <Tab label="Listings" />
                  <Tab label="Reservations" />
                </Tabs>
              </Paper>
              {/* End Tabs Menu// */}
              {console.log(this.value)}
              {value === 0 && (
                <TabContainer>
                  <Paper className={classes.paper} elevation={0}>
                    <div>
                      <h1>LISTINGS</h1>
                      <div className={classes.cardContainer}>
                        {this.state.listing.map(listing => {

                  
                          if (listing.user === this.state.userId) {
                            return (
                              <div>
                                <ListingCard
                                  loadListings={this.loadListings}
                                  key={listing._id}
                                  id={listing._id}
                                  title={listing.title}
                                  photo={listing.photo}
                                  address={listing.address}
                                  earning={listing.earning}
                                  earnings={listing.earnings}
                                  city={listing.city}
                                  state={listing.state}
                                  zipcode={listing.zipcode}
                                  handleEditListing={this.handleEditListing}
                                  handleAvailListing={this.handleAvailListing}
                                />
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </Paper>
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <Paper className={classes.paper} elevation={0}>
                    <div>
                      <h1>RESERVATIONS</h1>
                      <div className={classes.cardContainer}>
                        {this.state.reserved.map(reserved => {
                          console.log("jknasjdnasjnd", reserved)
                          if (reserved.renter === this.state.userId)
                          return (
                      
                              <div>
                                <ReservCard
                                  date={moment(reserved.date).format("LL")}
                                  id={reserved._id}
                                  address={reserved.address}
                                  title={reserved.title}
                                  photo={reserved.photo}
                                  loadReserved={this.loadReserved2}
                                />
                              </div>
                            );
                        })}
                      </div>
                    </div>
                  </Paper>
                </TabContainer>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

//   render() {
//     console.log("##################");
//     console.log(this.state.listing.length);
//     console.log(
//       this.state.listing.filter(item =>
//         console.log(item.user === this.state.userId)
//       )
//     );
//     console.log(this.state.userId);
//     return (
//       <div>
//         {console.log(this.state.listing)}
//         <Nav />
//         {/* <h2>Welcome back, {this.state.userName}!</h2> */}

//         {this.state.listing
//           // .filter(listing => listing.user._id === this.state.user.user._id)
//           .map(listing => {
//             if (listing.user === this.state.userId) {
//               return (
//                 <div>
//                   <h1>LISTINGS</h1>
//                   <ListingCard
//                     key={listing._id}
//                     id={listing._id}
//                     title={listing.title}
//                     photo={listing.photo}
//                     address={listing.address}
//                     city={listing.city}
//                     state={listing.state}
//                     zipcode={listing.zipcode}
//                     handleEditListing={this.handleEditListing}
//                     handleAvailListing={this.handleAvailListing}
//                   />
//                 </div>
//               );
//             }
//           })}

//         {this.state.reserved.map(reserved => {
//           if (reserved.renter === this.state.userId)
//             // {this.state.listings.map(listing) => {
//             //   if(listing._id === reserved.listing)

//             return (
//               <div>
//                 <h1>RESERVATIONS</h1>

//                 <ReservCard

//                   date = {moment(reserved.date).format('LL')}
//                   address={reserved.address}
//                   title={reserved.title}
//                   photo={reserved.photo}
//                 />
//               </div>
//             );
//         })}
//         {/* })} */}
//       </div>
//     );
//   }
// }

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
