import React, { Component } from "react";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import axios from "axios";

class AddListing extends Component {
  state = {
    title: "",
    parkingtype: "",
    photo: "",
    address: "",
    city: "",
    state: "",
    zipcode: ""
  };


// handleFormSubmit = event => {

//   event.preventDefault();

//   console.log("form submitted!")

//   API.saveListing()

// }

  render() {
    return (
      <div>
        <Nav />
        <div className="container my-5">
          <h4>Create Listing</h4>

          <form>
            <div className="form-group">
              <label for="listingTitle">Title</label>
              <input
                type="text"
                className="form-control"
                id="inputTitle"
                placeholder="Open driveway on quiet street"
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="parkingType">Parking Type</label>
                <select className="form-control" id="parkingType">
                  <option></option>
                  <option>Garage</option>
                  <option>Street</option>
                  <option>Private Outdoor Lot Space</option>
                  <option>Driveway</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label for="uploadPhoto">Photo</label>
                <input
                  type="text"
                  className="form-control"
                  id="uploadPhoto"
                  placeholder="Link to the photo here"
                />
              </div>
            </div>
            <div className="form-group">
              <label for="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" className="form-control" id="inputCity" />
              </div>
              <div className="form-group col-md-4">
                <label for="inputState">State</label>
                <input type="text" className="form-control" id="inputState" />
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
                <input type="text" className="form-control" id="inputZip" />
              </div>
            </div>
            <div className="form-group"></div>
            <button type="submit" className="btn btn-primary" id="addListing">
              Add Listing
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddListing;
