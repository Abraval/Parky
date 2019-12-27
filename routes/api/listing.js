const router = require("express").Router();
const listingController = require("../../controllers/listingController");




// router.route("/")
//   .get(listingController.findAll)
//   .post(listingController.createListing);

router.route("/listing")
.get(listingController.findAll)
.post(listingController.createListing)

module.exports = router;