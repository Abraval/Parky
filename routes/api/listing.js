const router = require("express").Router();
const listingController = require("../../controllers/listingController");




// router.route("/")
//   .get(listingController.findAll)
//   .post(listingController.createListing);

router.route("/listing")
.post(listingController.createListing);
// .get(listingController.findAll)

module.exports = router;