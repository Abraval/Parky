const router = require("express").Router();
const listingRoutes = require("./listing")
const availRoutes = require("./availability")


router.use("/listing", listingRoutes);
router.use("/availability", availRoutes);




module.exports = router

