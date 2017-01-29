import React, { Component } from 'react';
// import fetch from 'fetch';
import logo from './images/cyf.png';
import './styles/App.css';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesList: [],
      countryData: null,
      yearList:[],
      selectedYear: null
    }
  }
  onCountryChange = (event) => {
    this.setState({ selectedCountry: event.target.value });
  }

  onYearChange = (event) => {
    this.setState({ selectedYear: event.target.value });
  }

  onSubmitCountry = () => {
    this.getCountryStatistics(this.state.selectedCountry, this.state.selectedYear);
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
            />
          </div>
          <div>
            <button onClick={this.onSubmitCountry} type="submit">Retrieve Country statistics</button>
          </div>
        </div>
        {(this.state.countryData? <CountryDetails data={this.state.countryData} /> : <div>Select a country please.</div>)}

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

  getCountryStatistics(countryCode, year) {
    if(countryCode === '-1' || countryCode === undefined) return;
    const url = `http://data.unhcr.org/api/stats/demographics.json?country_of_residence=${countryCode}&year=${year}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
      //The data comes back as an array, we take the first element of the array as it contains our country data
      this.setState({ countryData: data[0]})
    })
  }
}

export default App;
