
const baseRate = {
  // take in the number of dependents; housebound or aa election (or none); and the rates object and determines the appropriate maximimum annual pension rate (MAPR)
  calculateMAPR: function (claimantType, dependents, hbaa, rates) {

    // if the claimant is either a Veteran or Surviving Spouse (so not a Surviving Child)
    if (claimantType === "Veteran" || claimantType === "Surviving Spouse") {

      // if no dependents, these are the three rates
      if (dependents === 0) {
        if (hbaa === "None") {
          return rates.baseRate;
        } else if (hbaa === "Housebound") {
          return rates.hbRate;
        } else if (hbaa === "Aid and Attendance") {
          return rates.aaRate;
        }

        // if one dependent, these are the three rates 
      } else if (dependents === 1) {
        if (hbaa === "None") {
          return rates.baseRateAddOne;
        } else if (hbaa === "Housebound") {
          return rates.hbRateAddOne;
        } else if (hbaa === "Aid and Attendance") {
          return rates.aaRateAddOne;
        }

        // if more than one dependent, these are the three rates
      } else if (dependents > 1) {
        // setting up modDeps that will determine the more additional allowance after 1 dependent
        let modDeps = dependents - 1;
        modDeps = modDeps * rates.moreDepsRate
        // the three rates after one dependent
        if (hbaa === "None") {
          return modDeps + rates.baseRateAddOne;
        } else if (hbaa === "Housebound") {
          return modDeps + rates.hbRateAddOne;
        } else if (hbaa === "Aid and Attendance") {
          return modDeps + rates.aaRateAddOne;
        }
      }

      // Surviving Child rate
    } else if (claimantType === "Surviving Child") {
      // Sole surviving children don't get additional allowance for dependents or for HB/AA
      return rates.baseRate;

      // if it's not one of the above, something has gone wrong
    } else {
      return "ERROR";
    }
  },

  // the method that determines the base rate for the medical expenses. Essentially baseRate/baseRateAddOne + any additional dependents (so no AA or HB additions)
  baseRateforMeds: function (claimantType, dependents, rates) {
    if (claimantType === "Veteran" || claimantType === "Surviving Spouse") {
      if (dependents === 0) {
        return rates.baseRate;
      } else if (dependents === 1) {
        return rates.baseRateAddOne;
      } else if (dependents > 1) {
        let modDeps = dependents - 1;
        modDeps = modDeps * rates.moreDepsRate;
        return modDeps + rates.baseRateAddOne;
      } else return "Error";
    } else if (claimantType === "Surviving Child") {
      // let temp = dependents;
      // temp = 0;
      return rates.baseRate;
    } else return "Error";
  }

}

// TESTING OBJECT (reflects how it comes back from the API request)
// var rates = {
//   "_id": "5c71e9d5c0e4cd1db024f38c",
//   "effectiveDate": "2016-12-01",
//   "claimantType": "Surviving Spouse",
//   "baseRate": 8656,
//   "hbRate": 10580,
//   "aaRate": 13836,
//   "baseRateAddOne": 11330,
//   "hbRateAddOne": 13249,
//   "aaRateAddOne": 16506,
//   "moreDepsRate": 2205
// }


// var rates1 = {
//   "_id": "5c71e9d5c0e4cd1db024f387",
//   "effectiveDate": "2016-12-01",
//   "claimantType": "Veteran",
//   "baseRate": 12907,
//   "hbRate": 15773,
//   "aaRate": 21531,
//   "baseRateAddOne": 16902,
//   "hbRateAddOne": 19770,
//   "aaRateAddOne": 25525,
//   "moreDepsRate": 2205
// }

// var rates2 = {
//   "_id": "5c71e9d5c0e4cd1db024f391",
//   "effectiveDate": "2016-12-01",
//   "claimantType": "Surviving Child",
//   "baseRate": 2205
// }

//   // TESTING FUNCTIONS for baseRate.baseRateforMeds
// console.log(baseRate.baseRateforMeds("Surviving Spouse", 0, rates));
// console.log(baseRate.baseRateforMeds("Surviving Spouse", 1, rates));
// console.log(baseRate.baseRateforMeds("Surviving Spouse", 2, rates));
// // 
// console.log(baseRate.baseRateforMeds("Veteran", 0, rates1));
// console.log(baseRate.baseRateforMeds("Veteran", 1, rates1));
// console.log(baseRate.baseRateforMeds("Veteran", 2, rates1));
// // these should all be the same
// console.log(baseRate.baseRateforMeds("Surviving Child", 5, rates2));
// console.log(baseRate.baseRateforMeds("Surviving Child", 0, rates2));
// console.log(baseRate.baseRateforMeds("Surviving Child", 6, rates2));
// // these should all return error
// console.log(baseRate.baseRateforMeds("Frank", 5, rates));
// console.log(baseRate.baseRateforMeds("Tim", 0, rates));
// console.log(baseRate.baseRateforMeds("John", 6, rates));

// TESTING FUNCTIONS FOR baseRate.calculateMAPR
// console.log(baseRate.calculateMAPR("Surviving Spouse", 0, "None", rates));
// console.log(baseRate.calculateMAPR("Surviving Spouse", 1, "None", rates));
// console.log(baseRate.calculateMAPR("Surviving Spouse", 3, "None", rates));
// console.log(baseRate.calculateMAPR("Surviving Spouse", 0, "Housebound", rates));
// console.log(baseRate.calculateMAPR("Surviving Spouse", 1, "Housebound", rates));
// console.log(baseRate.calculateMAPR("Surviving Spouse", 3, "Housebound", rates));
// console.log(baseRate.calculateMAPR("Surviving Spouse", 0, "Aid and Attendance", rates));
// console.log(baseRate.calculateMAPR("Surviving Spouse", 1, "Aid and Attendance", rates));
// console.log(baseRate.calculateMAPR("Surviving Spouse", 3, "Aid and Attendance", rates));
// 
// console.log(baseRate.calculateMAPR("Veteran", 0, "None", rates1));
// console.log(baseRate.calculateMAPR("Veteran", 1, "None", rates1));
// console.log(baseRate.calculateMAPR("Veteran", 3, "None", rates1));
// console.log(baseRate.calculateMAPR("Veteran", 0, "Housebound", rates1));
// console.log(baseRate.calculateMAPR("Veteran", 1, "Housebound", rates1));
// console.log(baseRate.calculateMAPR("Veteran", 3, "Housebound", rates1));
// console.log(baseRate.calculateMAPR("Veteran", 0, "Aid and Attendance", rates1));
// console.log(baseRate.calculateMAPR("Veteran", 1, "Aid and Attendance", rates1));
// console.log(baseRate.calculateMAPR("Veteran", 3, "Aid and Attendance", rates1));
// 
// console.log(baseRate.calculateMAPR("Surviving Child", 0, "None", rates2));
// console.log(baseRate.calculateMAPR("Surviving Child", 1, "None", rates2));
// console.log(baseRate.calculateMAPR("Surviving Child", 3, "None", rates2));
// console.log(baseRate.calculateMAPR("Surviving Child", 0, "Housebound", rates2));
// console.log(baseRate.calculateMAPR("Surviving Child", 1, "Housebound", rates2));
// console.log(baseRate.calculateMAPR("Surviving Child", 3, "Housebound", rates2));
// console.log(baseRate.calculateMAPR("Surviving Child", 0, "Aid and Attendance", rates2));
// console.log(baseRate.calculateMAPR("Surviving Child", 1, "Aid and Attendance", rates2));
// console.log(baseRate.calculateMAPR("Surviving Child", 3, "Aid and Attendance", rates2));


// console.log(baseRate.calculateMAPR("Frank", 0, "None", rates2));