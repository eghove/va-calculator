import Grid from '@material-ui/core/Grid';
import React from 'react';
import "./HomePage.css"
import Footer from '../components/Footer';


  function HomePage () {
    return (
      <div>
        <Grid container spacing = {24}>
              <Grid item xs={12} id='homeTitle'>What is the VA Pension Estimator?</Grid>
              
              <Grid item xs={2}></Grid>

              <Grid item xs={8} id='homeText'>
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
                </Grid>

                <Grid item xs={2}></Grid>
          </Grid>
                <Footer>
                <p> This is the disclaimer for the app. Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 
                      1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                      publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                
                </Footer>

      </div>
    );
  }


export default HomePage;