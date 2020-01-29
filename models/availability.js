const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const availabilitySchema = new Schema({
  date: { type: Date, unique: false, required: false },
  listing: { type: Schema.Types.ObjectId, ref: "Listing" },
  renter: { type: Schema.Types.ObjectId, default: null },
  revenue: { type: Number, unqiue: false, required: false },
  address: { type: String, unique: false, required: false },
  title: { type: String, unique: false, required: false },
  photo: { type: String, unique: false, required: false },
  price: { type: Number, unique: false, required: false, default: 0 }
});

const Availability = mongoose.model("Availability", availabilitySchema);
module.exports = Availability;
