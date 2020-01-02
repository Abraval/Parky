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
  getReservForProf: function() {
    return axios.get("/api/listing/reserved");
  },
  getListingById: function(id) {
    return axios.get("api/listing", {
      params: {
        id
      }
    });
  },
  updateAvailability: function(availabilityData) {
    return axios.put("api/availability", availabilityData);
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
  },
  
};
