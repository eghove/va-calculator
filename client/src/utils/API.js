import axios from "axios";


export default {
  // the function that retrieves the rates from the server
  getRates: function(effectiveDate, claimantType) {
    return axios.get("/api/estimate/" + effectiveDate + "/" + claimantType)
  },

  // function that POSTS the survey/?rre responses to the server
  postSurveyData: function(surveyData) {
    return axios.post("api/estimate/store-estimate", surveyData)
  }
}

