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
// Material UI sidebar imports
import Hidden from "@material-ui/core/Hidden";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Avatar from "@material-ui/core/Avatar";

const drawerWidth = 240;

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
    display: "flex"
  },
  tabs: {
    flexGrow: 1
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
  },
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1
  // },
  drawerPaper: {
    width: drawerWidth
  },
  // content: {
  //   flexGrow: 1
  // },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  appBar: {
    // marginLeft: drawerWidth,
    zIndex: theme.zIndex.drawer + 1
    // [theme.breakpoints.up("sm")]: {
    //   width: `calc(100% - ${drawerWidth}px)`
    // }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1
    // padding: theme.spacing.unit * 3
  },
  large: {
    width: 150,
    height: 150,
    marginTop: "20px"
  }
});

class Profile extends Component {
  state = {
    listing: [],
    reserved: [],
    user: {},
    userId: "",
    userName: "",
    firstname: "",
    lastname: "",
    photo: "",
    reservationsObject: {},
    // For tabs
    value: 0,
    mobileOpen: false
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
        this.setState({ firstname: res.data.user.firstname });
        this.setState({ lastname: res.data.user.firstname });
        this.setState({ photo: res.data.user.photo });
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

  processReserved = reserved => {
    // The default data model (array) isn't suitable for grouping the listings by dates. An object is more appropriate.
    let reservationsObject = {};
    reserved.forEach(reservation => {
      reservationsObject[reservation.listing] =
        reservationsObject[reservation.listing] || reservation; // Initialize the listing key with the reservation
      reservationsObject[reservation.listing].reservations =
        reservationsObject[reservation.listing].reservations || []; // Create an empty array if no previous reservations were added to this listing
      reservationsObject[reservation.listing].reservations = [
        ...reservationsObject[reservation.listing].reservations,
        { date: reservation.date, reservationId: reservation._id }
      ]; // Add a new reservation to the listing
    });

    console.log("Reservation Obj", reservationsObject);
    this.setState({
      reservationsObject
    });
  };

  loadReserved = () => {
    API.getReservForProf(this.state.userId)
      .then(res => {
        this.processReserved(res.data);
        this.setState({ reserved: res.data });
        console.log("RESERVATIONS");
        console.log(res.data);
        // let reservListId =
        // console.log("RESERVATIONS");
        // console.log(res.data);
      })

      .catch(err => console.log(err));
  };

  loadReserved3 = () => {
    API.getReservForProf(this.state.userId)
      .then(res => {
        this.setState({ reserved: res.data });
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
        this.setState({ reserved: res.data });
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

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;
    const { value, reservationsObject } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />

        <List
          className={classes.drawerList}
          style={{
            fontFamily: "Roboto",
            color: "#545454",
            fontSize: "18px"
          }}
        >
          <Avatar
            width="200"
            src={
              !this.state.photo
                ? "https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-512.png"
                : this.state.photo
            }
            className={classes.large}
          />
          <h3 style={{ textAlign: "center" }}>
            Welcome back, {this.state.firstname}!
          </h3>
          {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>
        {/* <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} elevation={0}>
          <Nav />
        </AppBar>

        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              // anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <div>
            <div className={classes.root}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  {/* //Begin Tabs Menu// */}
                  <Paper className={classes.tabs} square={true} elevation={0}>
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
                                      handleAvailListing={
                                        this.handleAvailListing
                                      }
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
                            {Object.keys(this.state.reservationsObject).map(
                              key => {
                                console.log("jknasjdnasjnd", key);
                                if (
                                  reservationsObject[key].renter ===
                                  this.state.userId
                                )
                                  return (
                                    <div>
                                      <ReservCard
                                        date={moment(
                                          reservationsObject[key].date
                                        ).format("LL")}
                                        reservations={
                                          reservationsObject[key].reservations
                                        }
                                        id={reservationsObject[key]._id}
                                        address={
                                          reservationsObject[key].address
                                        }
                                        title={reservationsObject[key].title}
                                        photo={reservationsObject[key].photo}
                                        loadReserved={this.loadReserved}
                                      />
                                    </div>
                                  );
                              }
                            )}
                          </div>
                        </div>
                      </Paper>
                    </TabContainer>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
