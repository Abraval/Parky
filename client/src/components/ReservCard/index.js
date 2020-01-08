import React from "react";
import moment from "moment";
import "./style.css";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import API from "../../utils/API";
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
import CancelIcon from "@material-ui/icons/Cancel";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

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
  bookings: {
    overflowY: "scroll",
    height: "80px"
  }
});

class ReservCard extends React.Component {
  state = {
    date: this.props.date,
    address: this.props.address,
    title: this.props.title,
    photo: this.props.photo,
    currentReservedId: this.props.id,
    cancelReservationShown: false,
    reservationToCancel: ""
  };

  cancelReservation = () => {
    API.deleteAvailability(this.state.reservationToCancel)
      .then(res => {
        console.log(res);
        this.props.loadReserved();
        console.log(this);
        this.setState({
          cancelReservationShown: false
        });
      })
      .catch(err => console.log(err));
  };

  hideCancelReservation = () => {
    this.setState({
      cancelReservationShown: false
    });
  };

  showCancelReservation = id => {
    this.setState({
      cancelReservationShown: true,
      reservationToCancel: id
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        {console.log("kajsdkla", this.state.currentReservedId)}
        <CardMedia
          className={classes.media}
          image={this.props.photo}
          title={this.props.title}
        />
        <CardHeader title={this.props.title} subheader={this.props.address} />
        <div className={classes.bookings}>
          {this.props.reservations.map(reservation => {
            return (
              <p
                key={reservation.reservationId}
                style={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  paddingRight: "40px"
                }}
              >
                <Button
                  onClick={() =>
                    this.showCancelReservation(reservation.reservationId)
                  }
                  color="warning"
                >
                  <HighlightOffIcon style={{ color: "#DB5461" }} />
                </Button>
                {moment(reservation.date).format("LL")}
              </p>
            );
          })}
        </div>

        {/* Cancel Reservation */}

        <Dialog
          style={{ fontFamily: "Roboto" }}
          open={this.state.cancelReservationShown}
          handleClickOpen={this.showCancelReservation}
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
            <CancelIcon
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
              CONFIRM CANCELLATION
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
                Do you want to cancel this reservation?
              </h4>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.cancelReservation()}
              color="#E24E28"
              style={{ display: "flex" }}
            >
              Cancel Reservation
            </Button>
            <Button
              onClick={() => this.hideCancelReservation()}
              color="secondary"
            >
              Exit
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    );
  }
}

ReservCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReservCard);
