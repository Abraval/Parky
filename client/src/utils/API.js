import axios from "axios";

export default {
  saveListing: function(listingData) {
    return axios.post("/api/listing", listingData);
  },
  getUser: function () {
    return axios.get("/user/");
  },
  getListings: function(){
    return axios.get("/api/listing");
  },
  getListingById: function() {
    return axios.get("api/listing");
  },
  createAvailability: function(availabilityData) {
    return axios.post("api/availability", availabilityData);
  }
};
