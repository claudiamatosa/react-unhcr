import React, { Component } from 'react';

class CountriesList extends Component {
  renderCountries() {
    const countries = this.props.countries;

    return (
      countries.map((country, index) => {
        return(
          <option value={country.country_of_residence} key={index}>
            {country.country_of_residence_en}
          </option>
        )
      })
    )
  }

  renderYears() {
    const years = this.props.years;

    return (
      years.map((year, index) => {
        return (
          <option value={year} key={index}>
            {year}
          </option>
        )
      })
    )
  }

  render() {
    return (
      <div>
        <select onChange={this.props.onCountryChange} value={this.props.selectedCountry}>
          <option value="-1" key="-1">Select a country</option>
            {this.renderCountries()}
        </select>

        <select onChange={this.props.onYearChange} value={this.props.selectedYear}>
          <option value="-1" key="-1">Select Year</option>
            {this.renderYears()}
        </select>
      </div>
    )
  }
}

export default CountriesList;
