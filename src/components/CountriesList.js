import React, { Component } from 'react';

class CountriesList extends Component {
  render() {
    const countries = this.props.countries;
    return (<select onChange={this.props.onChange}>
            <option value="-1" key="-1">Select a country</option>
      {
        countries.map((country, index) => {
          return(
            <option value={country.country_of_residence} key={index}>
              {country.country_of_residence_en}
            </option>
          )
        })
      }
    </select>)
  }
}

export default CountriesList;
