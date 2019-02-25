// the logic for the estimator

// for testing
var a = process.argv[2];

const estimator = {
  // method that takes in the baseRate, calculates the medical expense deduction.
  calcMedDed: function (baseRate) {
    // the medical expense deduction is 5% of the baserate, rounded down to the nearest dollar.
    let medicalDeduction = parseInt(baseRate) * .05;
    // rounds it down to the nearest whole dollar and returns the value.
    return medicalDeduction = parseInt(medicalDeduction);
  },

  // method that takes in a single monthly income and annualizes it
  calcAnnSingInc: function(monthlyAmount) {
    // mutiplies the monthly income by 12 to annualize it
    let annualAmt = parseFloat(monthlyAmount) * 12;
    // returns it rounded down to the nearest whole dollar
    return annualAmt = parseInt(annualAmt);
  }
}

// console.log(estimator.calcAnnSingInc(a));