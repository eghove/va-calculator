
const baseRate = {
  // take in the number of dependents; housebound or aa election (or none); and the rates object and determines the appropriate maximimum annual pension rate (MAPR)
  calculateMAPR: function (claimantType, dependents, hbaa, rates) {

    // if the claimant is either a Veteran or Surviving Spouse (so not a Surviving Child)
    if (claimantType === "Veteran" || "Surviving Spouse") {

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
  }
}

// // TESTING OBJECT (reflects how it comes back from the API request)
// var rates = {
//     "_id": "5c71e9d5c0e4cd1db024f38c",
//     "effectiveDate": "2016-12-01",
//     "claimantType": "Surviving Spouse",
//     "baseRate": 8656,
//     "hbRate": 10580,
//     "aaRate": 13836,
//     "baseRateAddOne": 11330,
//     "hbRateAddOne": 13249,
//     "aaRateAddOne": 16506,
//     "moreDepsRate": 2205
//   } 

//   // TESTING FUNCTIONS
//   console.log(baseRate.calculate("Surviving Spouse", 0, "None", rates));
//   console.log(baseRate.calculate("Surviving Spouse", 1, "None", rates));
//   console.log(baseRate.calculate("Surviving Spouse", 6, "None", rates));
//   // 
//   console.log(baseRate.calculate("Surviving Spouse", 0, "Housebound", rates));
//   console.log(baseRate.calculate("Surviving Spouse", 1, "Housebound", rates));
//   console.log(baseRate.calculate("Surviving Spouse", 6, "Housebound", rates));
//   // 
//   console.log(baseRate.calculate("Surviving Spouse", 0, "Aid and Attendance", rates));
//   console.log(baseRate.calculate("Surviving Spouse", 1, "Aid and Attendance", rates));
//   console.log(baseRate.calculate("Surviving Spouse", 6, "Aid and Attendance", rates));
  