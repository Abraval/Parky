const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const availabilitySchema = new Schema({
  date: { type: Date, unique: false, required: false },
  listing: { type: Schema.Types.ObjectId, ref: "Listing" },
  renter: { type: Schema.Types.ObjectId, default: null},
  revenue: { type: Number, unqiue: false, required: false },
  // reserved: {
  //   type: String,
  //   default: false
  // },
});

const Availability = mongoose.model("Availability", availabilitySchema);
module.exports = Availability;
