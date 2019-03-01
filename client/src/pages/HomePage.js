import Grid from '@material-ui/core/Grid';
import React from 'react';
import './QuestionnairePage.css';
// import ReactDOM from 'react-dom';
//import Button from '@material-ui/core/Button';

  function HomePage () {
    return (
      <div>
        <Grid container spacing = {24}>
          <Grid item xs={12} id='surveyTitle'><h4>What is the VA Pension Estimator About?</h4></Grid>
          
          <Grid item xs={2}></Grid>
          <Grid item xs={8} id='surveyText'>
          <h5>
              The U.S. Department of Veterans Affairs (the VA) administers an income-assistance program
              called Veterans Pension (or, in the case of dependents who survive a deceased veteran,
              Survivors Pension) about which many misperceptions exist. There are many income-related
              factors that determine the monthly Pension rate to which a veteran or veteran’s surviving
              dependent may be entitled. While there are pages upon pages of documents on the VA’s
              website and on other websites explaining how the Pension rate may be calculated, there isn’t a
              simple, intuitive ballpark estimate calculator that potential applicants can use.
              Potential applicants may use this application to estimate their potential Pension rate. 
              Potential applicants may use this estimate to inform their decision as to whether
              they wish to initiate an often lengthy application process.
            </h5></Grid>
            <Grid item xs={2}></Grid>
          </Grid>
      </div>
    );
  }


export default HomePage;