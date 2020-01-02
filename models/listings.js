const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const listingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, unique: false, required: false },
  parkingtype: { type: String, unique: false, required: false },
  photo: { type: String, unique: false, required: false },
  price: { type: Number, unique: false, required: false },
  address: { type: String, unique: false, required: false },
  city: { type: String, unique: false, required: false },
  state: { type: String, unique: false, required: false },
  zipcode: { type: Number, unique: false, required: false },
  streetName: { type: String, unique: false, required: false },
  neighborhood: { type: String, unique: false, required: false },
  location: {
    type: { type: Number },
    coordinates: []
  },
  // reserved: {
  //   type: Boolean,
  //   default: false
  // },
  // renter: { type: Schema.Types.ObjectId, default: null},
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
