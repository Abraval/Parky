const router = require("express").Router();
const listingController = require("../../controllers/listingController");

router
  .route("/")
  .get(listingController.findAll)
  .post(listingController.createListing);

router
  .route("/near")
  .get(listingController.findAllNear)

  router
  .route("/profile")
  .get(listingController.findAllProfListing)
  .put(listingController.editListing)

  router
  .route("/reserved/")
  .get(listingController.findReserved)

  router
  .route("/reserved/:id")
  .get(listingController.findReservedById)


  // .put(listingController.editListing);


module.exports = router;
