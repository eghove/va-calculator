// THE API ROUTE TO GET THE NECESSARY RATES FOR ESTIMATION

const router = require("express").Router();
// pull in the rates controller
const estimatorController = require("../../controllers/estimatorController");

// matches with "/api/estimate"
router.route("/")
  // get calls the method that returns the appropriate rates for the estimator
  .get(estimatorController.findRate);

// export the router
module.exports = router;