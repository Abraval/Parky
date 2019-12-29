const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Listing.find({ _id: req.query.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createListing: function(req, res) {
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

    console.dir("req.params is" + req.params); 
    console.log("this is line 22: " + req.query);
    console.log("=======================");
    console.dir(JSON.stringify(req.query));
    console.log("=======================");
    const dates = req.query.dates;
    console.log("Searched dates: ", dates);
    const startDay = dates[0]; 
    const endDay = dates[1]; 

    console.log("date 1 is", startDay); 
    console.log("date 2 is", endDay); 


    db.Availability.find({ 
      date: {
        $gte: startDay, 
        $lt: endDay
      }
      })
      .then(dbModel => {
        res.json(dbModel);
        // dbModel.map(item => {
        //   db.Listing.find(item.listing).then(response => res.json(response));
        // });
      })
      .catch(err => res.status(422).json(err));
  }
};
