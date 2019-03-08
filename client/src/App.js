import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import QuestionnairePage from "./pages/QuestionnairePage";
// import NoMatch from "./pages/NoMatch";
import ResultsPage from "./pages/ResultsPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import "./nav.css";
// import Nav from "./components/Nav";
// import { Button, Navbar, NavItem, NavLink, NavbarBrand } from 'reactstrap';


// import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render () {
    const { isAuthenticated } = this.props.auth;
    return (
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton className="menuButton" href = "/" color="inherit" aria-label="Menu">VA Pension Estimator
              </IconButton>
              <Typography variant="h6" color="inherit" className="grow">
              {/* <Button color="inherit"   href = "/">About</Button> */}
              <Button color="inherit"   href = "/questions">Begin Questionnaire</Button>
              <Button color="inherit" href = "/about">About the Team</Button>
              </Typography>
                {
                  !isAuthenticated() && (
                    <Button color = "inherit"
                      id="qsLoginBtn"
                      bsstyle="primary"
                      className="btn-margin"
                      onClick={this.login.bind(this)}
                    >
                      Log In
                      </Button>
                  )
                }

                {
                  isAuthenticated() && (
                    <Button color = "inherit"
                      id="qsLogoutBtn"
                      bsstyle="primary"
                      className="btn-margin"
                      onClick={this.logout.bind(this)}
                    >
                      Log Out
                      </Button>
                  )
                }
              </Toolbar>
            </AppBar>
          <Switch>
              {/* <Route exact path="/" component={} /> */}
              <Route exact path="/" component={HomePage} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/results/:amount" component={ResultsPage} />
              <Route exact path="/questions" component={QuestionnairePage} />
              <Route exact path="/about" component={AboutPage} />
              {/* <Route component={NoMatch} /> */}
          </Switch>
        </div>
      </Router>
    )
  }
  
}

export default App;
