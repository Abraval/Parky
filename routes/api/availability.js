const router = require("express").Router();
const listingController = require("../../controllers/listingController");


router.route("/")
.get(listingController.findAllAvailable)
.post(listingController.createAvailability)


module.exports = router;