// the logic for the estimator

// for testing
var a = process.argv[2];

const estimator = {
  // method that takes in the baseRate, calculates the medical expense deduction.
  calculateMedDed: function (baseRate) {
    // the medical expense deduction is 5% of the baserate, rounded down to the nearest dollar.
    let medicalDeduction = parseInt(baseRate) * .05;
    // rounds it down to the nearest whole dollar and returns the value.
    return medicalDeduction = parseInt(medicalDeduction);
  }
}