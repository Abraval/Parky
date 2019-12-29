import React, { Component } from "react";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import axios from "axios";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

class AddListing extends Component {
  state = {
    title: "",
    parkingType: "",
    photo: "",
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

            this.setState(
              {
                coordinates: coordinates,
                longitude: longitude,
                latitude: latitude
              },
              () => {
                API.saveListing({
                  user: this.state.user._id,
                  title: this.state.title,
                  parkingType: this.state.parkingType,
                  photo: this.state.photo,
                  address: this.state.address,
                  city: this.state.city,
                  state: this.state.state,
                  zipcode: this.state.zipcode,
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
                <label for="parkingType">Parking Type</label>
                <select
                  className="form-control"
                  id="parkingType"
                  name="parkingType"
                  value={this.state.parkingType}
                  onChange={this.handleInputChange}
                >
                  <option></option>
                  <option>Garage</option>
                  <option>Street</option>
                  <option>Private Outdoor Lot Space</option>
                  <option>Driveway</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label for="photo">Photo</label>

                <input
                  value={this.state.photo}
                  onChange={this.handleInputChange}
                  type="text"
                  className="form-control"
                  id="photo"
                  name="photo"
                  placeholder="Link to the photo here"
                />
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
