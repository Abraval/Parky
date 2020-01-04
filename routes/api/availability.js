const router = require("express").Router();
const listingController = require("../../controllers/listingController");

router
  .route("/")
  .get(listingController.findAllAvailable)
  .post(listingController.createAvailability)
  
//the update should have the id in the url
router
.route("/")
.put(listingController.updateAvailabilityUser);

// router
// .route("/update")
// .post(listingController.createAvailabilityInDialog)

router
.route("/:id")
.get(listingController.getAvailabilityByListingId)
.delete(listingController.deleteAvailability)


module.exports = router;
