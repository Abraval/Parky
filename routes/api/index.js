const router = require("express").Router();
const listingRoutes = require("./listing")


router.use("/listing", listingRoutes);




module.exports = router

