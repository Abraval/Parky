const router = require("express").Router();
const listingController = require("../../controllers/listingController");

router
  .route("/")
  .get(listingController.findAllAvailable)
  .post(listingController.createAvailability);

router.route("/")
.put(listingController.updateAvailabilityUser);

router
  .route("/:id")
  .get(listingController.getAvailabilityByListingId)
  .delete(listingController.deleteAvailability);

module.exports = router;
