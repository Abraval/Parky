import axios from "axios";

export default {
  saveListing: function(listingData) {
    return axios.post("/api/listing", listingData);
  },
  getUser: function() {
    return axios.get("/user/");
  },
  getListings: function() {
    return axios.get("/api/listing");
  },
  getListingsForProf: function() {
    return axios.get("/api/listing/profile");
  },
  getListingById: function(id) {
    return axios.get("api/listing", {
      params: {
        id
      }
    });
  },
  createAvailability: function(availabilityData) {
    return axios.post("api/availability", availabilityData);
  },
  getAvailableListings: function(dates) {
    return axios.get("api/availability", {
      params: {
        dates
      }
    });
  }
};
