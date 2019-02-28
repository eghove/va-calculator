import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import QuestionnairePage from "./pages/QuestionnairePage"
import NoMatch from "./pages/NoMatch"
import Nav from "./components/Nav"


// import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
            {/* <Route exact path="/" component={} /> */}
            <Route exact path="/questions" component={QuestionnairePage} />
            <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
