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
  }
};
