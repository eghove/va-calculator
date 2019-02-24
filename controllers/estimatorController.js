// pull in the models
const db = require("../models");

// define the methods for estimatorController.js

module.exports = {
  // method that returns the appropriate rate based on year and claimant type
  findRate: function(req, res) {
    // might be able to refactor these next two declarations out
    // let effectiveDate = req.params.effectiveDate;
    // let claimantType = req.params.claimantType;
    db.Rates
      .find( {effectiveDate: req.body.effectiveDate, claimantType: req.body.claimantType})
      .then(dbResults => res.json(dbResults))
      .catch(err => res.status(422).json(err));
  }
}

