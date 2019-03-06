import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import QuestionnairePage from "./pages/QuestionnairePage";
import NoMatch from "./pages/NoMatch";
import ResultsPage from "./pages/ResultsPage";
import HomePage from "./pages/HomePage";
// import Nav from "./components/Nav";
import { Button, Navbar, NavItem, NavLink, NavbarBrand } from 'reactstrap';


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
        <Navbar color="light">
            <NavbarBrand href="/">
              VA Pension Estimator
            </NavbarBrand>
            <NavLink href="questions">
              Questionnaire
            </NavLink>
            {
              !isAuthenticated() && (
                <Button
                  id="qsLoginBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.login.bind(this)}
                >
                  Log In
                  </Button>
              )
            }

            {
              isAuthenticated() && (
                <Button
                  id="qsLogoutBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                  </Button>
              )
            }

          </Navbar>
          <Switch>
              {/* <Route exact path="/" component={} /> */}
              <Route exact path="/" component={HomePage} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/results/:amount" component={ResultsPage} />
              <Route exact path="/questions" component={QuestionnairePage} />
              <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
  
}

export default App;
