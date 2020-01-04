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

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

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
  }

  userInfo = () => {
    API.getUser()
      .then(res => {
        // console.log("=======");
        // console.log(res);
        // console.log("=======");
        this.setState({ user: res.data });
        this.setState({ userId: res.data.user._id });
        // this.setState({userName: res.data.user.firstname})
        // console.log(res.data.user._id);
        // console.log("++++++++++++++++++++++++++++++++++++++");
        // console.log(res.data.user.firstname);
        // console.log(this.state.user);
        // console.log("=======");
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
        // console.log("xxxxxxxx");
        // console.log(res.data);
        this.setState({ listing: res.data });
        console.log(this.state.listing);
        console.log(this.state.user);
        // console.log("xxxxx");
        // console.log("State User");
        // console.log(this.state.user.user._id);
      })
      .catch(err => console.log(err));
  };

  loadReserved = () => {
    API.getReservForProf(this.state.userId)
      .then(res => {
        this.setState({ reserved: res.data });
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
          <Grid container spacing={8}>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                Sidebar & Profile Image
                <h2>Welcome back, {this.state.userName}!</h2>
              </Paper>
            </Grid>

            {/* ////////////////////////////// */}

            <Grid item xs={10}>
              {/* //Begin Tabs Menu// */}
              <Paper className={classes.root}>
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
                  <Paper className={classes.paper}>
                    <div>
                      <h1>LISTINGS</h1>
                      {this.state.listing.map(listing => {
                        if (listing.user === this.state.userId) {
                          return (
                            <div>
                              <ListingCard
                                key={listing._id}
                                id={listing._id}
                                title={listing.title}
                                photo={listing.photo}
                                address={listing.address}
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
                  </Paper>
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <Paper className={classes.paper}>
                    <div>
                      <h1>RESERVATIONS</h1>
                      {this.state.reserved.map(reserved => {
                        if (reserved.renter === this.state.userId)
                          return (
                            <div>
                              <ReservCard
                                date={moment(reserved.date).format("LL")}
                                address={reserved.address}
                                title={reserved.title}
                                photo={reserved.photo}
                              />
                            </div>
                          );
                      })}
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
