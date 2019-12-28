const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Listing.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createListing: function(req, res) {
    // console.log(req.body)
    // let newListing = {
    //     title: req.body.title,
    //     parkingtype: req.body.parkingType,
    //     photo: req.body.photo,
    //     address: req.body.address,
    //     city: req.body.city,
    //     state: req.body.state,
    //     zipcode: req.body.zipcode

    // };
    db.Listing.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createAvailability: function(req, res) {
    console.log("++++++++++++++++++++" + req.body + "++++++++++++++++++++++");
    db.Availability.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAllAvailable: function(req, res) {
    console.log(req);
    db.Availability.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
