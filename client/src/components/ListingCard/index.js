import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import API from "../../utils/API";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
// Material UI Cards imports
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  card: {
    minWidth: 300,
    maxWidth: 300,
    minHeight: 400,
    maxHeight: 400,
    margin: "8px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex",
    justifyContent: "center"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  dialog: {
    minWidth: 500,
    minHeight: 275,
    textAlign: "center"
  }
});

class ListingCard extends React.Component {
  state = {
    open: false,
    open2: false,
    openEarnings: false,
    title: this.props.title,
    address: this.props.address,
    city: this.props.city,
    state: this.props.state,
    zipcode: this.props.zipcode,
    currentModalId: this.props.id,
    //Material UI card
    openDeleteConfirm: false,
    expanded: false,
    selectedDays: [],
    lastWeekEarnings: 0,
    lastMonthEarnings: 0,
    totalEarnings: 0,
    deleteListingPopuUpShown: false,
    initialAvailabilities: [] //used to figure out which availablities to create and to delete
  };

  //You should only fetch availabilities when the modal opens
  //availabilites modal should be a class componenent.
  componentDidMount = () => {
    console.log("props... ", this.props);
    this.processEarnings(this.props.earnings);
    API.getAvailabilitiesByListingId(this.props.id)
      .then(res => {
        console.log("ListingCard.ComponentDIdMount res", res);
        console.log(
          "ListingCard.ComponentDIdMount this.props.id",
          this.props.id
        );
        const selectedDays = res.data.map(day => new Date(day.date));
        this.setState({
          selectedDays: [...selectedDays],
          initialAvailabilities: [...res.data]
        });
      })
      .catch(err => console.log("ListingCard.componentDidMount err", err));
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickOpen2 = () => {
    this.setState({ open2: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  showEarning = () => {
    this.setState({ openEarnings: true });
  };

  hideEarning = () => {
    this.setState({ openEarnings: false });
  };

  handleClose2 = () => {
    this.setState({ open2: false });
  };

  showDeleteListing = () => {
    this.setState({
      deleteListingPopuUpShown: true
    });
  };

  hideDeleteListing = () => {
    this.setState({
      deleteListingPopuUpShown: false
    });
  };

  deleteListing = id => {
    API.deleteListing(id)
      .then(res => {
        this.props.loadListings();
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    let value = event.target.value;
    let name = event.target.name;
    console.log(event.target.value);
    this.setState({
      [name]: value
    });
  };

  handleDateSubmit = event => {
    console.log("this has been submitted!!");
    const currentSet = this.state.selectedDays;

    const initialSelectedDays = this.state.initialAvailabilities.map(
      day => new Date(day.date)
    );
    console.log(
      "listingCard.handleDateSubmit initialSelectedDays",
      initialSelectedDays
    );
    const initialSet = initialSelectedDays;

    const removedElements = [...initialSet].filter(initialElement => {
      let found = true;
      currentSet.forEach(currentElement => {
        if (DateUtils.isSameDay(initialElement, currentElement)) {
          found = false;
        }
      });
      return found;
    });
    const addedElements = [...currentSet].filter(currentElement => {
      let found = true;
      initialSet.forEach(initialElement => {
        if (DateUtils.isSameDay(initialElement, currentElement)) {
          found = false;
        }
      });
      return found;
    });

    console.log(
      "ListingCard.handleDateSubmit ",
      "removedElements",
      removedElements,
      "addedElements",
      addedElements
    );

    addedElements.forEach(day => {
      API.createAvailability({
        date: day,
        listing: this.props.id
        // .map over all selected dates in array and create a new row in the avail collection for each date and include the the the id of listing
      });
    });
    removedElements.forEach(day => {
      const availability = this.state.initialAvailabilities.find(avail => {
        return DateUtils.isSameDay(new Date(avail.date), new Date(day));
      });
      API.deleteAvailability(availability._id);
    });
    this.setState({ open2: false });
  };

  handleListingUpdate = event => {
    this.setState({ open: false });
    console.log("ListingCard.handleListingUpdate this.state", this.state);
    API.editListing(this.state)
      .then(res => {
        console.log("ListingCard.handleListingUpdate res", res);
        this.props.loadListings();
      })

      .catch(err => console.log(err));
  };

  handleDelete = id => {
    API.deleteListing(id)
      .then(res => {
        this.props.loadListings();
      })
      .catch(err => console.log(err));
  };

  processEarnings = earnings => {
    //Define temporary variable to hold computtion
    let lastWeekEarnings = 0;
    let lastMonthEarnings = 0;
    let totalEarnings = 0;

    // For each earning, check what date bracket it falls into
    earnings.forEach(earning => {
      // Compare the earnings date to the date today
      let today = new Date();
      totalEarnings += earning.amount;
      let earningDate = new Date(earning.date);
      const diffTime = Math.abs(today - earningDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
        lastWeekEarnings += earning.amount;
        lastMonthEarnings += earning.amount;
      } else if (diffDays <= 30) {
        lastMonthEarnings += earning.amount;
      }
    });
    console.log(
      "earnings....",
      "Total",
      totalEarnings,
      lastWeekEarnings,
      lastMonthEarnings
    );
    this.setState({
      lastWeekEarnings,
      lastMonthEarnings,
      totalEarnings
    });
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      open: false,
      open2: false,
      title: this.props.title,
      address: this.props.address,
      city: this.props.city,
      state: this.props.state,
      zipcode: this.props.zipcode,
      currentModalId: this.props.id,
      //Material UI card
      expanded: false,
      selectedDays: []
    };
  }

  handleDayClick(day, { selected }) {
    console.log("ListingCard.handleDayClick day", day);
    console.log("ListingCard.handleDayClick selected", selected);
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
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    console.log(this.state);
    console.log(this.props);
    const { classes } = this.props;
    return (
      <Card className={classes.card} style={{ position: "relative" }}>
        <CardMedia
          className={classes.media}
          image={this.props.photo}
          title={this.props.title}
        />
        <CardHeader title={this.props.title} subheader={this.props.address} />
        <CardContent></CardContent>
        <CardActions
          className={classes.actions}
          disableActionSpacing
          style={{
            position: "absolute",
            bottom: "10px",
            left: "0",
            right: "0",
            margin: "auto"
          }}
        >
          <IconButton
            aria-label="Edit Listing"
            title="Edit"
            onClick={() => this.handleClickOpen()}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Edit Availability"
            title="Availability"
            onClick={() => this.handleClickOpen2()}
          >
            <DateRangeIcon />
          </IconButton>
          <IconButton
            aria-label="Show Earnings"
            title="Earnings"
            onClick={() => this.showEarning()}
          >
            <AttachMoneyIcon />
          </IconButton>
          <IconButton
            aria-label="Delete Listing"
            title="Delete"
            onClick={() => this.showDeleteListing()}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>

        <Dialog
          open={this.state.open}
          style={{ fontFamily: "Roboto" }}
          handleClickOpen={this.handleClickOpen}
        >
          <DialogTitle
            id="form-dialog-title"
            style={{
              fontFamily: "Roboto",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <EditIcon
              style={{
                color: "93b7be",
                width: 75,
                height: 75,
                marginTop: 20
              }}
            />
          </DialogTitle>
          <DialogContent>
            <Typography
              style={{
                color: "#93b7be",
                fontSize: 20,
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center"
              }}
            >
              EDIT LISTING
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                autoFocus
                margin="dense"
                name="title"
                type="text"
                fullWidth
                value={this.state.title}
                onChange={this.handleInputChange}
                label="Title"
                variant="outlined"
              />

              <TextField
                autoFocus
                margin="dense"
                // id="name"
                name="address"
                // label="Email Address"
                type="text"
                fullWidth
                value={this.state.address}
                onChange={this.handleInputChange}
                label="Address"
                variant="outlined"
              />

              <TextField
                autoFocus
                margin="dense"
                name="city"
                type="text"
                fullWidth
                value={this.state.city}
                onChange={this.handleInputChange}
                label="City"
                variant="outlined"
              />

              <TextField
                autoFocus
                margin="dense"
                // id="name"
                name="state"
                // label="Email Address"
                type="text"
                fullWidth
                value={this.state.state}
                onChange={this.handleInputChange}
                label="State"
                variant="outlined"
              />

              <TextField
                autoFocus
                margin="dense"
                // id="name"
                name="zipcode"
                // label="Email Address"
                type="text"
                fullWidth
                value={this.state.zipcode}
                onChange={this.handleInputChange}
                label="Zipcode"
                variant="outlined"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleListingUpdate()} color="primary">
              Submit
            </Button>
            <Button onClick={() => this.handleClose()} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* This is a new dialog */}

        <Dialog
          style={{ fontFamily: "Roboto" }}
          open={this.state.openEarnings}
          handleClickOpen={this.showEarning}
        >
          <DialogTitle
            id="form-dialog-title"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#93b7be",
              fontFamily: "Roboto"
            }}
          >
            <AttachMoneyIcon
              style={{
                color: "#93b7be",
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
            className={classes.dialog}
          >
            <Typography
              style={{
                color: "#93b7be",
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              EARNINGS
            </Typography>
            <Card
              elevation={0}
              style={{
                padding: "10px 60px",
                border: "1px solid  #93b7be",
                marginTop: 20
              }}
            >
              <h4 style={{ color: "#545454" }}>
                Total Earnings: ${this.state.totalEarnings}{" "}
              </h4>
              <h6 style={{ color: "#545454" }}>
                Total earnings to date, incluing future bookings
              </h6>
              <h4 style={{ color: "#545454" }}>
                Last 7 Days: ${this.state.lastWeekEarnings}{" "}
              </h4>
              <h4 style={{ color: "#545454" }}>
                Last 30 Days: ${this.state.lastMonthEarnings}{" "}
              </h4>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.hideEarning()} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Popup */}

        <Dialog
          style={{ fontFamily: "Roboto" }}
          open={this.state.deleteListingPopuUpShown}
          handleClickOpen={this.showDeleteListing}
        >
          <DialogTitle
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#93b7be",
              fontFamily: "Roboto"
            }}
            id="form-dialog-title"
          >
            <DeleteIcon
              style={{
                color: "93b7be",
                width: 75,
                height: 75,
                marginTop: 20
              }}
            />
          </DialogTitle>
          <DialogContent
            className={classes.dialog}
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
              CONFIRMATION
            </Typography>
            <Card
              elevation={0}
              style={{
                padding: "10px 60px",
                border: "1px solid  #93b7be",
                marginTop: 20
              }}
            >
              <h4 style={{ color: "#545454" }}>
                Do you want to delete this listing?{" "}
              </h4>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.deleteListing(this.state.currentModalId)}
              color="primary"
            >
              Delete
            </Button>
            <Button onClick={() => this.hideDeleteListing()} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* This is a new dialog */}
        <Dialog
          style={{ fontFamily: "Roboto" }}
          open={this.state.open2}
          handleClickOpen={this.handleClickOpen2}
        >
          <DialogTitle
            id="form-dialog-title"
            style={{
              fontFamily: "Roboto",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <DateRangeIcon
              style={{
                color: "93b7be",
                width: 75,
                height: 75,
                marginTop: 20
              }}
            />
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            <Typography
              style={{
                color: "#93b7be",
                fontSize: 20,
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center"
              }}
            >
              EDIT AVAILABILITY
            </Typography>
            {/* <Button onClick={() => this.handleListingUpdate()} color="primary">
      Submit
    </Button> */}
            <div>
              <DayPicker
                selectedDays={this.state.selectedDays}
                onDayClick={this.handleDayClick}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDateSubmit()} color="primary">
              Submit
            </Button>
            <Button onClick={() => this.handleClose2()} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    );
  }
}

ListingCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListingCard);
