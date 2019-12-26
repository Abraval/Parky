import axios from "axios";

export default {
  getListings: function() {
    return axios.get("/api/listing");
  },
  saveListing: function(listingData) {
    return axios.post("/api/listing", listingData);
  }
};
