const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

const listingSchema = new Schema({

	title: { type: String, unique: false, required: false },
    parkingtype: { type: String, unique: false, required: false },
    photo: { type: String, unique: false, required: false },
    address: { type: String, unique: false, required: false },
    address2: { type: String, unique: false, required: false },
    city: { type: String, unique: false, required: false },
    state: { type: String, unique: false, required: false },
    zipcode: { type: Number, unique: false, required: false}

})

const Listing = mongoose.model('Listing', listingSchema)
module.exports = Listing;