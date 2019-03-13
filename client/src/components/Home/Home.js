import Grid from '@material-ui/core/Grid';
import React from 'react';
import "../Home/Home.css"
// import Footer from '../Footer';


  function Home () {
    return (
      <div>
        <Grid item xs={12} id='logoutText'>You are now logged out.</Grid>
      </div>
    );
  }


export default Home;