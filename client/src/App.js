import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import QuestionnairePage from "./pages/QuestionnairePage"
import NoMatch from "./pages/NoMatch"
import ResultsPage from "./pages/ResultsPage"
import HomePage from "./pages/HomePage"
import Nav from "./components/Nav"


// import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
            {/* <Route exact path="/" component={} /> */}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/results/:amount" component={ResultsPage} />
            <Route exact path="/questions" component={QuestionnairePage} />
            <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
