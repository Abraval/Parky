const router = require("express").Router();
const listingController = require("../../controllers/listingController");

router
  .route("/")
  .get(listingController.findAllAvailable)
  .post(listingController.createAvailability)
  .put(listingController.updateAvailability);

router.route("/").put(listingController.updateAvailabilityUser);


module.exports = router;
