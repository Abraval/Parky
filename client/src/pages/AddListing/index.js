import React from "react";
import Nav from "../../components/Nav";

function AddListing() {
  return (
    <div>
      <Nav />
      <div className="container my-5">
      <h4>Create Listing</h4>

      <form>
        <div class="form-group">
          <label for="listingTitle">Title</label>
          <input
            type="text"
            class="form-control"
            id="inputTitle"
            placeholder="Open driveway on quiet street"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="parkingType">Parking Type</label>
            <select class="form-control" id="parkingType">
              <option></option>
              <option>Garage</option>
              <option>Street</option>
              <option>Private Outdoor Lot Space</option>
              <option>Driveway</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="uploadPhoto">Photo</label>
            <input
              type="text"
              class="form-control"
              id="uploadPhoto"
              placeholder="Link to the photo here"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress2">Address 2</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputCity">City</label>
            <input type="text" class="form-control" id="inputCity" />
          </div>
          <div class="form-group col-md-4">
            <label for="inputState">State</label>
            <select id="inputState" class="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="inputZip">Zip</label>
            <input type="text" class="form-control" id="inputZip" />
          </div>
        </div>
        <div class="form-group"></div>
        <button type="submit" class="btn btn-primary" id="addListing">
          Add Listing
        </button>
      </form>
      </div>
    </div>
  );
}

export default AddListing;
