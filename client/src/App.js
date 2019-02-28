import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import QuestionnairePage from "./pages/QuestionnairePage"
import NoMatch from "./pages/NoMatch"
import Nav from "./components/Nav"
import Login from './Login';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

// import './App.css';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

function App() {
  return (
    <Router history={history}>
      <div>
        <Nav />
        <Switch>
            {/* <Route exact path="/" component={} /> */}
            <Route path="/" render={(props) => <Login auth={auth} {...props} />} />
            <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} /> 
            }}/>
            <Route exact path="/questions" component={QuestionnairePage} />
            <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
