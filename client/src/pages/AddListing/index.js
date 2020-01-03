import React, { Component } from "react";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import axios from "axios";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
// import Button from "../../components/Button";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";

// const useStyles = makeStyles(theme => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1)
//     }
//   }
// }));

class AddListing extends Component {
  state = {
    title: "",
    parkingtype: "",
    photo: "",
    price: 0.0,
    address: "",
    city: "",
    state: "",
    zipcode: "",
    user: {},
    fulladdress: "",
    coordinates: {},
    longitude: 0.0,
    latitude: 0.0
  };

  componentDidMount() {
    this.userInfo();
  }

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: []
    };
  }

  handleDayClick(day, { selected }) {
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

  userInfo = () => {
    axios.get("/user/").then(response => {
      console.log(response.data);
      if (response.data.user) {
        this.setState({
          user: response.data.user
        });
      }
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    this.setState(
      {
        fulladdress:
          this.state.address +
          " " +
          this.state.city +
          " " +
          this.state.state +
          " " +
          this.state.zipcode
      },
      () => {
        let location = this.state.fulladdress;
        // console.log(location);

        axios
          .get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
              address: location,
              key: "AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo"
            }
          })
          .then(response => {
            var latitude = response.data.results[0].geometry.location.lat;
            var longitude = response.data.results[0].geometry.location.lng;
            var coordinates = { longitude, latitude };
            var streetName =
              response.data.results[0].address_components[1].long_name;
            var neighborhood =
              response.data.results[0].address_components[2].long_name;

            console.log(
              response.data.results[0].address_components[2].long_name
            );

            let apiKey = "AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo";

            var queryUrl =
              "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" +
              latitude +
              "," +
              longitude +
              "&fov=80&heading=70&pitch=0&key=" +
              apiKey;

            this.setState(
              {
                coordinates: coordinates,
                longitude: longitude,
                latitude: latitude,
                photo: queryUrl
              },
              () => {
                API.saveListing({
                  user: this.state.user._id,
                  title: this.state.title,
                  parkingtype: this.state.parkingtype,
                  photo: this.state.photo,
                  price: this.state.price,
                  address: this.state.address,
                  city: this.state.city,
                  state: this.state.state,
                  zipcode: this.state.zipcode,
                  streetName,
                  neighborhood,
                  location: {
                    coordinates: [this.state.longitude, this.state.latitude]
                  }
                })
                  .then(res => {
                    this.state.selectedDays.map(date => {
                      const listingId = res.data._id;

                      API.createAvailability({
                        date,
                        listing: listingId
                        // .map over all selected dates in array and create a new row in the avail collection for each date and include the the the id of listing
                      });
                    });
                  })
                  .catch(err => console.log(err));
              }
            );
          });
      }
    );
  };

  render() {
    // console.log(this.state);
    // const classes = useStyles();

    return (
      <div>
        <Nav />
        <div className="container my-5">
          <h4>Create Listing</h4>

          <form>
            <div className="form-group">
              <label for="title">Title</label>
              <input
                value={this.state.title}
                onChange={this.handleInputChange}
                type="text"
                name="title"
                className="form-control"
                id="title"
                placeholder="Open driveway on quiet street"
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="parkingtype">Parking Type</label>
                <select
                  className="form-control"
                  id="parkingtype"
                  name="parkingtype"
                  value={this.state.parkingtype}
                  onChange={this.handleInputChange}
                >
                  <option></option>
                  <option>Garage</option>
                  <option>Street</option>
                  <option>Private Lot</option>
                  <option>Driveway</option>
                </select>
              </div>

              <div className="form-group col-md-6">
                <label for="price">Price</label>
                <input
                  value={this.state.price}
                  onChange={this.handleInputChange}
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  placeholder="Enter daily price"
                />

                {/* <input
                  value={this.state.photo}
                  onChange={this.handleInputChange}
                  type="text"
                  className="form-control"
                  id="photo"
                  name="photo"
                  placeholder="Link to the photo here"
                /> */}
              </div>
            </div>
            <div className="form-group">
              <label for="address">Address</label>

              <input
                value={this.state.address}
                onChange={this.handleInputChange}
                type="text"
                className="form-control"
                name="address"
                id="address"
                placeholder="1234 Main St"
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group col-md-4">
                <label for="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={this.state.state}
                  onChange={this.handleInputChange}
                />
              </div>
              {/* <div className="form-group col-md-4">
            <label for="inputState">State</label>
            <select id="inputState" className="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div> */}
              <div className="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="zipcode"
                  name="zipcode"
                  value={this.state.zipcode}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-group"></div>
            <button
              type="submit"
              onClick={this.handleFormSubmit}
              className="btn btn-primary"
              id="addListing"
            >
              Add Listing
            </button>
            {/* <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.handleFormSubmit}
              id="addListing"
            >
              Add Listing
            </Button> */}
          </form>
          <div>
            <DayPicker
              selectedDays={this.state.selectedDays}
              onDayClick={this.handleDayClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AddListing;
