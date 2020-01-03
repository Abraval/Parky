import React from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";

const styles = theme => ({
    button: {
      margin: theme.spacing.unit
    },
    input: {
      display: "none"
    }
  });

  class ReservCard extends React.Component {
    state = {
      date: this.props.date,
      address: this.props.address,
      title: this.props.title,
      photo: this.props.photo
  
    };


    render() {
        console.log(this.state)
        console.log(this.props)
        return (
<div className="card" {...this.props} tabIndex="0">
<div className="card-header">
  <div className="row">
    <div className="card-title"><h2>{this.props.title}</h2>
    </div>
        <img alt={this.props.title} className="img-fluid" src={this.props.photo} />
        <h3>{this.props.address}</h3>
        <p>Date: {this.props.date}</p>
  </div>
</div>

<div className="card-footer">
  <Button
    variant="contained"
    color="primary"
    onClick={() => this.handleClickOpen()}
  >
    Delete reservation
  </Button>
  </div>
  </div>
  )
  }
}

export default ReservCard;