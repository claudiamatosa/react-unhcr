import React, { Component } from 'react';
// import fetch from 'fetch';
import logo from './images/cyf.png';
import './styles/App.css';
import CountriesList from './components/CountriesList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesList: [],
      yearList:[],
      // We are reading the route parameters here too, so we can fill the dropdown
      // boxes with the information we get from the url.
      //
      // For example: Navigating to /country/BHR/year/2013 will fill the dropdown
      // boxes with "Bahrain" and "2013". (Launch the server and give it a try!)
      selectedCountry: props.params.countryCode,
      selectedYear: props.params.year,
    };
  }

  onCountryChange = (event) => {
    this.setState({ selectedCountry: event.target.value });
  }

  onYearChange = (event) => {
    this.setState({ selectedYear: event.target.value });
  }

  onSubmitCountry = () => {
    // Instead of updating the data ourselves, we navigate to a url that contains
    // the countryCode and year. The CountryDetails component will take care of the rest!
    const destinationUrl = `/country/${this.state.selectedCountry}/year/${this.state.selectedYear}`;

    // "router" is a special prop given to App by react-router. It allows doing several
    // things, including navigating between pages.
    //
    // Using "push" will change the url without refreshing.
    this.props.router.push(destinationUrl);
  }

  render() {
    return (
      <div className="App">
        <div className="app-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>UNHCR Data Browser</h2>
        </div>
        <div className="app-search-box">
          <div>
            <CountriesList
              countries={this.state.countriesList}
              onCountryChange={this.onCountryChange}
              years={this.state.yearList}
              onYearChange={this.onYearChange}
              selectedCountry={this.state.selectedCountry}
              selectedYear={this.state.selectedYear}
            />
          </div>
          <div>
            <button onClick={this.onSubmitCountry} type="submit">Retrieve Country statistics</button>
          </div>
        </div>

        {/* The component in the routes file will go here. */}
        { this.props.children }

      </div>
    );
  }
  componentDidMount() {
      this.getCountriesList();
      this.getYearList();
  }
  getCountriesList() {
    const countryURL = 'http://data.unhcr.org/api/stats/country_of_residence.json'
    fetch(countryURL)
      .then(response => response.json())
      .then(data => {
        this.setState({ countriesList: data });
      });
  }

  getYearList() {
    const yearURL = 'http://data.unhcr.org/api/stats/time_series_years.json';
    fetch(yearURL)
    .then(response => response.json())
    .then(data => {
      this.setState({ yearList: data });
    });
  }
}

export default App;
