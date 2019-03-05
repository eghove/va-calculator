import Grid from '@material-ui/core/Grid';
import React, {Component} from 'react';
import './QuestionnairePage.css';
//import ReactDOM from 'react-dom';
// import Fab from '@material-ui/core/Fab';
import './ResultsPage.css'
import Button from '@material-ui/core/Button';

  class Results extends Component {
    // parse the match parameter back into an integer
    amount = parseInt(this.props.match.params.amount);
    // this function will return commas for numbers greater than 999
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
   
   render() {
    return (
      <div>
      <Grid container spacing = {24}>
        <Grid item xs={12} id='surveyTitle' ><h4>Results</h4></Grid>
        <Grid item xs={12} id='surveyTitle' ><h5>
          {this.amount > 0 ? "You may be eligible for...$" + this.numberWithCommas(this.amount) + ".00 per month!" :
          "Based on the information you provided, it appears you may not qualify for VA Pension benefits."}
          </h5>
        
        
        </Grid>
      </Grid>

      <Grid container spacing = {24}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
        <Button target="_blank" id="applyButton" href="https://www.va.gov/pension/how-to-apply/">Click here to learn how to Apply</Button>
          </Grid>
          <Grid item xs={4}></Grid>
      </Grid>

      </div>

    );
  }
}


export default Results;