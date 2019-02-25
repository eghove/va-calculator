// the logic for the estimator

// for testing
// var a = process.argv[2];


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
  },

  // method that takes in a single monthly medical expense and annualizes it.
  calcAnnSingExp: function (monthlyAmount) {
    // multiplies the monthly expense by 12 to annualize it. NOTE: Medical expenses DO NOT get rounded down to the nearest dollar at this stage.
    let annualAmt = parseFloat(monthlyAmount) * 12;
    // round down to two decimal places and return the value
    return annualAmt = Math.round(annualAmt * 100) / 100;
  },

  // method that calculates the total income from an array of monthly income amounts
  totalIncome: function(array) {
    let temp = 0;
    for (let i = 0; i < array.length; i++) {
      temp = temp + this.calcAnnSingInc(array[i])
    }
    return temp;
  }
}

// THE TESTING FUNCTIONS
// console.log(estimator.calcAnnSingInc(a));
// console.log(estimator.calcAnnSingExp(a));
// console.log(estimator.totalIncome([105.10, 25.62, 15.00]));
// console.log(estimator.totalIncome([1999.87, 14.99, 13.17]));