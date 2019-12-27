import React, { Component } from "react";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import axios from "axios";

class AddListing extends Component {
  state = {
    title: "",
    parkingType: "",
    photo: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    user: {}
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();

    console.log("form submitted!");

    API.saveListing({
      title: this.state.title,
      parkingType: this.state.parkingType,
      photo: this.state.photo,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode 
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
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
                <select className="form-control" id="parkingType" name="parkingType" value={this.state.parkingType}
              onChange={this.handleInputChange}>
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
                <input type="text" className="form-control" id="city" name="city" value={this.state.city}
                onChange={this.handleInputChange} />
              </div>
              <div className="form-group col-md-4">
                <label for="state">State</label>
                <input type="text" className="form-control" id="state" name="state" value={this.state.state}
                onChange={this.handleInputChange} />
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
                <input type="text" className="form-control" id="zipcode" name="zipcode" 
                value={this.state.zipcode}
                onChange={this.handleInputChange}/>
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
        </div>
      </div>
    );
  }
}

export default AddListing;
