const db = require("../models");

module.exports = {

    // findAll: function(req, res) {
    //     db.Listings
    //       .find(req.query)
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err));
    //   },
  createListing: function(req, res) {
    let newListing = {
        title: req.body.title,
        parkingtype: req.body.parkingtype,
        photo: req.body.photo,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode
    
    };
    db.Listings.create(newListing)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
