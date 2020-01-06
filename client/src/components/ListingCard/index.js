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

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  card: {
    maxWidth: 250,
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
    expanded: false,
    selectedDays: [],
    lastWeekEarnings: 0,
    lastMonthEarnings: 0,
    initialAvailabilities: []  //used to figure out which availablities to create and to delete
  };

//You should only fetch availabilities when the modal opens
//availabilites modal should be a class componenent.
  componentDidMount = ()  => {
    console.log("props... ", this.props)
    this.processEarnings(this.props.earnings)
    API.getAvailabilitiesByListingId(this.props.id)
    .then(res => { 
      console.log("ListingCard.ComponentDIdMount res", res)
      console.log("ListingCard.ComponentDIdMount this.props.id", this.props.id)
      const selectedDays = res.data.map(day => new Date(day.date))
      this.setState({selectedDays: [...selectedDays], initialAvailabilities: [...res.data]})
    })
    .catch(err => console.log("ListingCard.componentDidMount err", err))
  }
 

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
    this.setState({ openEarnings: true})
  }

  hideEarning = () => {
    this.setState({ openEarnings : false})
  }

  handleClose2 = () => {
    this.setState({ open2: false });
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
    
    console.log("this has been submitted!!")
    const currentSet = (this.state.selectedDays)

    const initialSelectedDays = this.state.initialAvailabilities.map(day => new Date(day.date))
    console.log("listingCard.handleDateSubmit initialSelectedDays", initialSelectedDays)
    const initialSet = (initialSelectedDays)

    const removedElements = ([...initialSet].filter(initialElement => {
      let found = true
      currentSet.forEach(currentElement => {
        if (DateUtils.isSameDay(initialElement, currentElement)) {
          found = false
        }
      })
      return found
    }))
    const addedElements = ([...currentSet].filter(currentElement => {
      let found = true
      initialSet.forEach(initialElement => {
        if (DateUtils.isSameDay(initialElement, currentElement)) {
          found = false
        }
      })
      return found
    }))


    console.log("ListingCard.handleDateSubmit ",  "removedElements", removedElements, "addedElements", addedElements )
  
    addedElements.forEach(day => {
      API.createAvailability({
        date: day,
        listing: this.props.id
        // .map over all selected dates in array and create a new row in the avail collection for each date and include the the the id of listing
      });
    })
    removedElements.forEach(day => {
      const availability = this.state.initialAvailabilities.find(avail => {
        return DateUtils.isSameDay(new Date(avail.date), new Date(day))
      })
      API.deleteAvailability(availability._id)

    })
    this.setState({open2: false})

  }


  handleListingUpdate = event => {
  this.setState({open: false})
    console.log("ListingCard.handleListingUpdate this.state", this.state)
    API.editListing(this.state)
    .then(res => {
      console.log("ListingCard.handleListingUpdate res", res)
      this.props.loadListings()
    
    })
  
      .catch(err => console.log(err));
  };

  handleDelete = id => {
    API.deleteListing(id)
    .then(res => {
      this.props.loadListings()
    })
      .catch(err => console.log(err));
    
  };

  processEarnings = earnings => {
    //Define temporary variable to hold computtion
    let lastWeekEarnings = 0
    let lastMonthEarnings = 0

    // For each earning, check what date bracket it falls into
    earnings.forEach((earning)=> {
    // Compare the earnings date to the date today
      let today = new Date()
      let earningDate = new Date(earning.date)
      const diffTime = Math.abs(today - earningDate)
      const diffDays = Math.ceil(diffTime/(1000 * 60 * 60 * 24))
      if(diffDays <= 7) {
        lastWeekEarnings += earning.amount
        lastMonthEarnings += earning.amount
      } else if(diffDays <= 30) {
        lastMonthEarnings += earning.amount
      }
    })
    console.log("earnings....", lastWeekEarnings, lastMonthEarnings)
    this.setState({
      lastWeekEarnings,
      lastMonthEarnings
    })
  }

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
    console.log("ListingCard.handleDayClick day", day)
    console.log("ListingCard.handleDayClick selected", selected)
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
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={this.props.photo}
          title={this.props.title}
        />
        <CardHeader title={this.props.title} subheader={this.props.address} />
        <CardContent>
          <Typography component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            aria-label="Edit Listing"
            onClick={() => this.handleClickOpen()}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Edit Availability"
            onClick={() => this.handleClickOpen2()}
          >
            <DateRangeIcon />
          </IconButton>
          <IconButton aria-label="Delete Listing" onClick={() => this.handleDelete(this.state.currentModalId)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="Edit Availability"
            onClick={() => this.showEarning()}
          >
            <DateRangeIcon />
          </IconButton>
        </CardActions>
        <Dialog open={this.state.open} handleClickOpen={this.handleClickOpen}>
          <DialogTitle id="form-dialog-title">Edit Listing</DialogTitle>
          <DialogContent>
            <span>Title: </span>
            <TextField
              autoFocus
              margin="dense"
              // id="name"
              name="title"
              // label="Email Address"
              type="text"
              fullWidth
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            <span>Address: </span>
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
            />
            <span>City: </span>
            <TextField
              autoFocus
              margin="dense"
              // id="name"
              name="city"
              // label="Email Address"
              type="text"
              fullWidth
              value={this.state.city}
              onChange={this.handleInputChange}
            />
            <span>State: </span>
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
            />
            <span>Zipcode: </span>
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
            />
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
        <Dialog open={this.state.openEarnings} handleClickOpen={this.showEarning}>
          <DialogTitle id="form-dialog-title">Earnings</DialogTitle>
          <DialogContent>

            <span>Total Earnings: {this.props.earning} </span>
            <span>Last 7 Days: {this.state.lastWeekEarnings} </span>
            <span>Last 30 Days: {this.state.lastMonthEarnings} </span>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => console.log("Submitting")} color="primary">
              Submit
            </Button>
            <Button onClick={() => this.hideEarning()} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
  open={this.state.open2}
  handleClickOpen={this.handleClickOpen2}
>
  <DialogActions>
    {/* <Button onClick={() => this.handleListingUpdate()} color="primary">
      Submit
    </Button> */}
    <div>
      <DayPicker
        selectedDays={this.state.selectedDays}
        onDayClick={this.handleDayClick}
      />
    </div>
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





























