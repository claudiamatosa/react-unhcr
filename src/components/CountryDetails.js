import React from 'react';

function CountryDetails(props) {
  const countryData = props.data;
  return (
    <div className="app-country-statistics">
      <strong>Country: </strong>{countryData.country_of_residence_en}<br/>
      <strong>Year: </strong>{countryData.year}<br/>
      <strong>Female Refugees: </strong>{countryData.female_total_value}<br/>
      <strong>Male Refugees: </strong>{countryData.male_total_value}<br/>
    </div>
  )
}
export default CountryDetails;
