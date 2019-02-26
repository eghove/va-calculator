import axios from "axios";


export default {
  // the function that retrieves the rates from the server
  getRates: function(effectiveDate, claimantType) {
    return axios.get("/api/estimate/" + effectiveDate + "/" + claimantType)
  }
}

