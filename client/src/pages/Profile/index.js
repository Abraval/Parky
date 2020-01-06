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
    // paddingTop: "6px",
    display: "flex"
  },
  tabs: {
    flexGrow: 1
    // paddingTop: "6px"
  },
  paper: {
    padding: theme.spacing.unit * 1,
    margin: "auto",
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "75vh"
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    textAlign: "center"
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar
});

class Profile extends Component {
  state = {
    listing: [],
    reserved: [],
    user: {},
    userId: "",
    userName: "",
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
        this.setState({ reserved: res.data });
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
    const { value } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />

        <List
          style={{
            fontFamily: "Roboto",
            color: "#545454",
            fontSize: "18px"
          }}
        >
          <img
            src="https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-512.png"
            width="200"
          />
          <h3>Welcome back, !</h3>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
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
                            {this.state.reserved.map(reserved => {
                              console.log("jknasjdnasjnd", reserved);
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
        </main>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
