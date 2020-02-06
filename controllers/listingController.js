const db = require("../models");
const mongoose = require("mongoose");

module.exports = {
  findAll: function(req, res) {
    db.Listing.find({ _id: req.query.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findReserved: function(req, res) {
    db.Availability.find({ renter: { $ne: null } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findReservedById: function(req, res) {
    db.Availability.find({ renter: req.query.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createListing: function(req, res) {
    console.log("+++++++++++REQ.BODY CREATE LISTING+++++++++++++");
    console.dir(req.body);
    console.log("--");
    console.dir(req.body.location.coordinates[0]);
    console.log("++++++++++++++++++++++++");

    req.body.location.type = "Point";

    db.Listing.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createAvailability: function(req, res) {
    db.Availability.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllAvailable: function(req, res) {
    console.log("Starting to Find All Available");
    const dates = req.query.dates;
    const startDay = dates[0];
    const endDay =
      dates.length === 1 ? startDay : dates[req.query.dates.length - 1];
    console.log("startDay is", startDay, "endDay is", endDay);
    db.Availability.find({
      date: {
        $gte: startDay,
        $lte: endDay
      },
      renter: null
    })
      .populate("listing")
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findAllProfListing: function(req, res) {
    db.Listing.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  editListing: function(req, res) {
    console.dir(req.body);
    console.dir(req.body.listing.currentModalId);
    db.Listing.findOneAndUpdate(
      { _id: req.body.listing.currentModalId },
      {
        $set: {
          title: req.body.listing.title,
          address: req.body.listing.address,
          city: req.body.listing.city,
          state: req.body.listing.state,
          zipcode: req.body.listing.zipcode
        }
      }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },
  findAllNear: function(req, res) {
    console.log("Find all near start");
    var long = req.query.data[0];
    var lat = req.query.data[1];

    long.type = "Point";
    lat.type = "Point";

    var floatLong = parseFloat(long);
    var floatLat = parseFloat(lat);

    console.log("Find all near end");
    db.Listing.syncIndexes().then(index => {
      console.log("indexes:", index);
    });
    db.Listing.find({
      location: {
        $near: {
          $maxDistance: 900,
          $geometry: {
            type: "Point",
            coordinates: [floatLong, floatLat]
          }
        }
      }
    })
      .find(error => {
        if (error) console.log(error);
      })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err.message));
  },
  updateAvailabilityUser: function(req, res) {
    console.log("UPDATE USER", req.body);
    const earning = req.body.price;
    const date = new Date();
    const earningObject = { amount: earning, date: date };
    console.log("line 154: ", req.body.renter);
    //Find a listing and push an earning into it's earning array
    db.Listing.findOneAndUpdate(
      { _id: req.body.listing },
      { $push: { earnings: earningObject } },
      {
        new: true,
        upsert: true
      }
    )
      .then(() => {
        // Find an availability and update it with new availability info
        console.log("req.body inside of findeOne", req.body);
        db.Availability.findOneAndUpdate(
          {
            listing: req.body.listing,
            date: req.body.date
          },
          {
            $set: {
              renter: mongoose.Types.ObjectId(req.body.userId),
              address: req.body.address,
              title: req.body.title,
              photo: req.body.photo,
              price: req.body.price
            }
          }
        ).then(function(dbListing) {
          res.json(dbListing);
        });
      })
      .catch(error => {
        res.status(400).json({
          error: error
        });
      });
  },
  deleteListing: function(req, res) {
    db.Listing.findById({ _id: req.params.id })
      .then(dbModel => dbModel.deleteOne())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getAvailabilityByListingId: function(req, res) {
    const { id } = req.params;
    db.Availability.find({ listing: id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteAvailability: function(req, res) {
    console.log("req.params deleteAvailability", req.params);
    const { id } = req.params;
    db.Availability.findOneAndUpdate(
      { _id: id },
      { $set: { renter: null, price: 0 } }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUser: function(req, res) {
    console.log("Req for FindUser: ", req.query.id);
    db.User.findOne({ _id: req.query.id })
      .then(dbModel =>
        res.json({
          user: dbModel,
          userId: dbModel._id
        })
      )
      .catch(err => res.json(err));
  }
};
