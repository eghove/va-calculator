const baseRate = require("./baserate");
const estimator = require("./estimator");

var rates = {
  "_id": "5c71e9d5c0e4cd1db024f38c",
  "effectiveDate": "2016-12-01",
  "claimantType": "Surviving Spouse",
  "baseRate": 8656,
  "hbRate": 10580,
  "aaRate": 13836,
  "baseRateAddOne": 11330,
  "hbRateAddOne": 13249,
  "aaRateAddOne": 16506,
  "moreDepsRate": 2205
}

console.log(estimator.monthlyRate([0], [1200.90], baseRate.calculateMAPR("Surviving Spouse", 0, "Aid and Attendance", rates), baseRate.baseRateforMeds("Surviving Spouse", 0, rates)));