import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import CountryDetails from './components/CountryDetails';

class Routes extends Component {
  render() {
    return(
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="country/:countryCode/year/:year" component={CountryDetails} />
        </Route>
      </Router>
    );
  }
}

export default Routes;
