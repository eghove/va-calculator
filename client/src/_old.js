import React, { Component } from "react";
import SimpleSelect from "./components/Survey";
import Grid from '@material-ui/core/Grid';
import "../src/pages/QuestionnairePage.css"

function QuestionnairePage () {
    return (
    <Grid container spacing = {24}>
        <Grid item xs={3}></Grid>    
        <Grid item xs={6} id="gridbox">

        <SimpleSelect
        />
        </Grid>
        <Grid item xs={3}></Grid>  
    </Grid>
    );
}


export default QuestionnairePage;