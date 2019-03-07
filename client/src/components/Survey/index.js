
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
// pull in estimator API call
import API from '../../utils/API';
// pull in estimator logic
import baseRate from '../../utils/baserate';
import estimator from '../../utils/estimator';
import "../Survey/survey.css"


  const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });
  
  class SimpleSelect extends React.Component {

    state = {
      as: '',
      ben: '',
      dependents: '',
      calcDate: '',
      selfSSIn: 0,
      depSSIn: 0,
      selfRetireIn: 0,
      depRetireIn: 0,
      selfOtherIn1: 0,
      depOtherIn1: 0,
      selfOtherIn2: 0,
      depOtherIn2: 0,
      selfMedPartBEx: 0,
      depMedPartBEx: 0,
      selfPrivMedIns: 0,
      depPrivMedIns: 0,
      selfOtherEx1: 0,
      depOtherEx1: 0,
      selfOtherEx2: 0,
      depOtherEx2: 0,
      name: '',
      labelWidth: 4000,
      rates: '',
      incomeArray: [0],
      expensesArray: [0],
      monthlyRate: 'None'
    };
  
    componentDidMount() {
      this.setState({
        labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      });
    }
  
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    // estimator functions

    aggregateIncome = (deps, amt1, amt2, amt3, amt4, depAmt1, depAmt2, depAmt3, depAmt4) => {
      // if no dependents
      if (parseInt(deps) < 1) {
        this.setState( {incomeArray: [parseFloat(amt1), parseFloat(amt2), parseFloat(amt3), parseFloat(amt4)]});
      } else {
        this.setState( {incomeArray: [parseFloat(amt1), parseFloat(amt2), parseFloat(amt3), parseFloat(amt4), parseFloat(depAmt1), parseFloat(depAmt2), parseFloat(depAmt3), parseFloat(depAmt4) ]});
      }
    }


    aggregateExpenses = (deps, amt1, amt2, amt3, amt4, depAmt1, depAmt2, depAmt3, depAmt4) => {
      // if no dependents
      if (parseInt(deps) < 1) {
        this.setState( {expensesArray: [parseFloat(amt1), parseFloat(amt2), parseFloat(amt3), parseFloat(amt4)]});
      } else {
        this.setState( {expensesArray: [parseFloat(amt1), parseFloat(amt2), parseFloat(amt3), parseFloat(amt4), parseFloat(depAmt1), parseFloat(depAmt2), parseFloat(depAmt3), parseFloat(depAmt4) ]});
      }
    }
    // function to insure all values are zero or greater

    validateAmounts = (array) => {
      let isValid = true;
      for (let i = 0; i < array.length; i++) {
        if (array[i] < 0) {
          isValid = false;
        }
      }
      return isValid;
    }

    // function validate no null
    validateNotNull = (array) => {
      let isValid = true;
      for (let i = 0; i < array.length; i++) {
        if ( isNaN(array[i])  ) {
          isValid = false
        }
      }
      return isValid;
    }

    handleCalculateButton = event => {
      event.preventDefault();

      // get the rates needed for the estimator, store them in state
      API.getRates(this.state.calcDate, this.state.as)
        .then(res =>
          this.setState({ rates: res.data })
        )
        // aggregate all the income values into an array that the estimator can read.
        .then(() => {
          this.aggregateIncome(
            this.state.dependents, this.state.selfSSIn, this.state.selfRetireIn, this.state.selfOtherIn1, this.state.selfOtherIn2, this.state.depSSIn, this.state.depRetireIn, this.state.depOtherIn1, this.state.depOtherIn2
          );
          this.aggregateExpenses(
            this.state.dependents, this.state.selfMedPartBEx, this.state.selfPrivMedIns, this.state.selfOtherEx1, this.state.selfOtherEx2, this.state.depMedPartBEx, this.state.depPrivMedIns, this.state.depOtherEx1, this.state.depOtherEx2
          );
          // if all the information in the arrays is 0 or greater, then take the user to the rates display
          if (
            this.validateAmounts(this.state.incomeArray) === true &&
            this.validateAmounts(this.state.expensesArray) === true &&
            this.validateNotNull(this.state.incomeArray) === true &&
            this.validateNotNull(this.state.expensesArray) === true
            ) {
            let monthlyRate =
              estimator.monthlyRate(this.state.incomeArray, this.state.expensesArray,
                baseRate.calculateMAPR(this.state.as, parseInt(this.state.dependents), this.state.ben, this.state.rates[0]), baseRate.baseRateforMeds(this.state.as, parseInt(this.state.dependents), this.state.rates[0]));
            window.location.replace("/results/" + monthlyRate);
          // if any of the information in the arrays is less than 0, keep the user on /questions to try again
          } else {
            alert("Please make sure any value entered in Monthly Income and Monthly Expenses is greater than or equal to zero.");
          }
        })
        .catch(err => console.log(err));
    }
  
    render() {
      const { classes } = this.props;
  
      return (
        <form className={classes.root} autoComplete="off" >

        <Grid container spacing = {24}>
 
        <Grid item xs={12} id='surveyTitle' >Survey Questions</Grid>
        
          <Grid item xs={12}>
                <FormControl className={classes.formControl} fullWidth ={true} >
                  <InputLabel
                  >
                    I am applying as a ...
                  </InputLabel>

                  <Select
                    value={this.state.as}
                    onChange={this.handleChange}
                    labelWidth={this.state.labelWidth}
                    inputProps={{
                      name: 'as',
                      id: 'age-simple',
                    }}
                  >
                    <MenuItem value={"Veteran"}>Veteran</MenuItem>
                    <MenuItem value={"Surviving Spouse"}>Surviving Spouse</MenuItem>
                    <MenuItem value={"Surviving Child"}>Surviving Child</MenuItem>
                  </Select>
                </FormControl>          
          </Grid>  

          <Grid item xs={12}>
                <FormControl className={classes.formControl} fullWidth ={true}>
                  <InputLabel
                    ref={ref => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-age-simple"
                  >
                    I am applying for one of the following additional benefits…
                  </InputLabel>

                  <Select
                    value={this.state.ben}
                    onChange={this.handleChange}
                    labelWidth={this.state.labelWidth}
                    inputProps={{
                      name: 'ben',
                      id: 'age-simple',
                    }}
                  >
                    <MenuItem value={"None"}>None</MenuItem>
                    <MenuItem value={"Housebound"}>Housebound</MenuItem>
                    <MenuItem value={"Aid and Attendance"}>Aid and Attendance</MenuItem>
                  </Select>
                </FormControl>
          </Grid>

          <Grid item xs={12}>
                  <FormControl className={classes.formControl} fullWidth ={true}>
              
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                    >
                      I have the following number of dependents…
                    </InputLabel>

                    <Select
                      value={this.state.dependents}
                      onChange={this.handleChange}
                      labelWidth={this.state.labelWidth}
                      inputProps={{
                        name: 'dependents',
                        id: 'age-simple',
                      }}
                    >
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                    </Select>
                  </FormControl>
            </Grid>

            <Grid item xs={12}>
            <FormControl className={classes.formControl} fullWidth ={true}>
                    {/* <InputLabel htmlFor="age-simple"> I am applying for one of the following additional benefits…</InputLabel> */}
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                    >
                      Calculate my VA Pension estimate from ...
                    </InputLabel>

                    <Select
                      value={this.state.calcDate}
                      onChange={this.handleChange}
                      labelWidth={this.state.labelWidth}
                      inputProps={{
                        name: 'calcDate',
                        id: 'age-simple',
                      }}
                    >
                      <MenuItem value={'2014-12-01'}>12/1/2014</MenuItem>
                      <MenuItem value={'2015-12-01'}>12/1/2015</MenuItem>
                      <MenuItem value={'2016-12-01'}>12/1/2016</MenuItem>
                      <MenuItem value={'2017-12-01'}>12/1/2017</MenuItem>
                      <MenuItem value={'2018-12-01'}>12/1/2018</MenuItem>
                  
                    </Select>
                  </FormControl>
            </Grid>

            <Grid item xs={8}></Grid>

            <Grid item xs={12}></Grid>


            <Grid container spacing = {24}>

                    <Grid item xs={4}><h4>Monthly Income</h4></Grid>
                    <Grid item xs={4}>You</Grid>
                    <Grid item xs={4}>Dependent(s)</Grid>


                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                          <FormControl className={classes.formControl} fullWidth ={true}>
                          <TextField
                            id="SSIncome"
                            label="Social Security Income"
                            value={this.state.selfSSIn}
                            onChange={this.handleChange}
                            className={classes.textField}
                            type="number"
                            InputProps={{
                              name: "selfSSIn",
                              startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                          />
                            </FormControl>
                      </Grid>
    
                    <Grid item xs={4}>
                            <FormControl className={classes.formControl} fullWidth ={true}>
                            <TextField
                              id="depSSIncome"
                              label="Social Security Income (Dependents)"
                              value={this.state.depSSIn}
                              onChange={this.handleChange}
                              type="number"
                              className={classes.textField}
                              InputProps ={{
                                name: 'depSSIn',
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              margin="normal"
                            />
                        </FormControl>
                    </Grid>



                    <Grid item xs={4}></Grid>  
                    <Grid item xs={4}>
                            <FormControl className={classes.formControl} fullWidth ={true}>
                            <TextField
                              id="selfRetireIncome"
                              label="Retirement Income"
                              value={this.state.selfRetireIn}
                              onChange={this.handleChange}
                              type="number"
                              className={classes.textField}
                              InputProps ={{
                                name: 'selfRetireIn',
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              margin="normal"
                            />
                    </FormControl>
                      </Grid>
    
                    <Grid item xs={4}>
                            <FormControl className={classes.formControl} fullWidth ={true}>
                          <TextField
                            id="depnRetireIncome"
                            label="Retirement Income (Dependents)"
                            value={this.state.depRetireIn}
                            onChange={this.handleChange}
                            InputProps ={{
                              name: 'depRetireIn',
                              startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                          />
                          </FormControl>
                    </Grid>     


                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}> 
                    <FormControl className={classes.formControl} fullWidth ={true}>
                    <TextField
                      id="selfOtherIncome1"
                      label="Other Income"
                      value={this.state.selfOtherIn1}
                      onChange={this.handleChange}
                      type="number"
                      className={classes.textField}
                      InputProps ={{
                        name: 'selfOtherIn1',
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                      </FormControl>
                      </Grid>

                      <Grid item xs={4}>
                      <FormControl className={classes.formControl} fullWidth ={true}>
                      <TextField
                        id="depOtherIncome1"
                        label="Other Income (Dependents)"
                        value={this.state.depOtherIn1}
                        onChange={this.handleChange}
                        InputProps ={{
                          name: 'depOtherIn1',
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                        </FormControl>
                        </Grid>
            


                      <Grid item xs={4}></Grid>
                    <Grid item xs={4}> 
                    <FormControl className={classes.formControl} fullWidth ={true}>
                    <TextField
                      id="selfOtherIncome2"
                      label="Other Income 2"
                      value={this.state.selfOtherIn2}
                      onChange={this.handleChange}
                      InputProps ={{
                        name: 'selfOtherIn2',
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                      </FormControl>
                      </Grid>

                      <Grid item xs={4}>
                      <FormControl className={classes.formControl} fullWidth ={true}>
                      <TextField
                        id="depOtherIncome2"
                        label="Other Income 2 (Dependents)"
                        value={this.state.depOtherIn2}
                        onChange={this.handleChange}
                        InputProps ={{
                          name: 'depOtherIn2',
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                         </FormControl>
                        </Grid>
                        <Grid item xs={4}></Grid>


                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>



                    <Grid item xs={4}><h4>Monthly Expenses</h4></Grid>
                    <Grid item xs={4}>You</Grid>
                    <Grid item xs={4}>Dependent(s)</Grid>




                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}> 
                    <FormControl className={classes.formControl} fullWidth ={true}>
                    <TextField
                      id="selfMedPartB"
                      label="Medicare Part B"
                      value={this.state.selfMedPartBEx}
                      onChange={this.handleChange}
                      InputProps ={{
                        name: 'selfMedPartBEx',
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                      </FormControl>                      
                      </Grid>

                      <Grid item xs={4}>
                      <FormControl className={classes.formControl} fullWidth ={true}>
                      <TextField
                        id="depOtherIncome2"
                        label="Medicare Part B (Dependents)"
                        value={this.state.depMedPartBEx}
                        onChange={this.handleChange}
                        InputProps ={{
                          name: 'depMedPartBEx',
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                        </FormControl>
                        </Grid>


                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}> 
                    <FormControl className={classes.formControl} fullWidth ={true}>
                    <TextField
                      id="selfPrivateMedIns"
                      label="Private Medical Insurance"
                      value={this.state.selfPrivMedIns}
                      onChange={this.handleChange}
                      InputProps ={{
                        name: 'selfPrivMedIns',
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                      </FormControl>
                      </Grid>

                      <Grid item xs={4}>
                      <FormControl className={classes.formControl} fullWidth ={true}>
                      <TextField
                        id="depPrivateMedIns"
                        label="Private Medical Insurance (Dependents)"
                        value={this.state.depPrivMedIns}
                        onChange={this.handleChange}
                        InputProps ={{
                          name: 'depPrivMedIns',
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                          </FormControl>
                        </Grid>


                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}> 
                    <FormControl className={classes.formControl} fullWidth ={true}>
                    <TextField
                      id="selfOtherExpense1"
                      label="Other Expense 1"
                      value={this.state.selfOtherEx1}
                      onChange={this.handleChange}
                      InputProps ={{
                        name: 'selfOtherEx1',
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                      </FormControl>
                      </Grid>

                      <Grid item xs={4}>
                      <FormControl className={classes.formControl} fullWidth ={true}>
                      <TextField
                        id="selfOtherExpense1"
                        label="Other Expense 1 (Dependents)"
                        value={this.state.depOtherEx1}
                        onChange={this.handleChange}
                        InputProps ={{
                          name: 'depOtherEx1',
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                        </FormControl>
                        </Grid>


                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}> 
                    <FormControl className={classes.formControl} fullWidth ={true}>
                    <TextField
                      id="selfOtherExpense2"
                      label="Other Expense 2"
                      value={this.state.selfOtherEx2}
                      onChange={this.handleChange}
                      InputProps ={{
                        name: 'selfOtherEx2',
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                      </FormControl>
                      </Grid>

                      <Grid item xs={4}>
                      <FormControl className={classes.formControl} fullWidth ={true}>
                      <TextField
                        id="selfOtherExpense2"
                        label="Other Expense 2 (Dependents)"
                        value={this.state.depOtherEx2}
                        onChange={this.handleChange}
                        InputProps ={{
                          name: 'depOtherEx2',
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                        </FormControl>
                        </Grid>

                        <Grid item xs={5}></Grid>
                        <Grid item xs={2}>
                          <label htmlFor="outlined-button-file">
                          <Button variant="outlined" component="span" size='medium' className={classes.button} onClick={(event) => { this.handleCalculateButton(event)}}>
                          Calculate
                          </Button>
                          </label>
                        </Grid>
                        <Grid item xs={5}></Grid>
                        
            </Grid>

        </Grid>

        </form>
      );
    }
  }
  
  SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleSelect);