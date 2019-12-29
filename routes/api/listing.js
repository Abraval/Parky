const router = require("express").Router();
const listingController = require("../../controllers/listingController");

router
  .route("/")
  .get(listingController.findAll)
  .post(listingController.createListing);

  router
  .route("/profile")
  .get(listingController.findAllProfListing);


module.exports = router;
