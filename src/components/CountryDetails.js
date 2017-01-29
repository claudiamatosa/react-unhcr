import React from 'react';

class CountryDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countryData: null,
      isFetchingData: false,
      isFetchError: false,
    }
  }

  render() {
    const countryData = this.state.countryData;
    const isFetchingData = this.state.isFetchingData;
    const isFetchError = this.state.isFetchError;

    if (isFetchingData) {
      // We are calling the API and waiting until it responds.
      return this.renderIsFetchingMessage();
    } else if (isFetchError) {
      // The API responded with an error.
      return this.renderErrorMessage();
    } else if (countryData) {
      // The API responded, we have the data. Let's display it in the page!
      return this.renderCountryData(this.state.countryData);
    } else {
      // The API responded, but there is no data available for this country and year.
      return this.renderNoDataMessage();
    }
  }

  renderCountryData(countryData) {
    return (
      <div className="app-country-statistics">
        <strong>Country: </strong>{countryData.country_of_residence_en}<br/>
        <strong>Year: </strong>{countryData.year}<br/>
        <strong>Female Refugees: </strong>{countryData.female_total_value}<br/>
        <strong>Male Refugees: </strong>{countryData.male_total_value}<br/>
      </div>
    );
  }

  renderIsFetchingMessage() {
    return (
      <div className="app-country-fetching">
        Loading data...
      </div>
    );
  }

  renderNoDataMessage() {
    return (
      <div className="app-country-no-data">
        There is no data for this country and year.
      </div>
    );
  }

  renderErrorMessage() {
    return (
      <div className="app-country-instructions">
        There was an error while fetching the statistics.
      </div>
    );
  }

  componentDidMount() {
    this.getCountryStatistics();
  }

  componentDidUpdate(previousProps) {
    if (
      previousProps.params.countryCode !== this.props.params.countryCode ||
      previousProps.params.year !== this.props.params.year
    ) {
      // The address bar has been updated and we need to load the statistics for
      // the newly selected country/year pair.
      this.getCountryStatistics();
    }
  }

  getCountryStatistics() {
    /*
      Params will come from the Route, and will be an object consisting of { countryCode, year }.

      Example:
      {
        countryCode: IRN,
        year: 2010,
      }
    */
    const params = this.props.params;
    const countryCode = params.countryCode;
    const year = params.year;

    if (countryCode === '-1' || countryCode === undefined || !year) return;

    // Let's inform the component that we are fetching the statistics.
    this.setState({ isFetchingData: true, isFetchError: false });

    const url = `http://data.unhcr.org/api/stats/demographics.json?country_of_residence=${countryCode}&year=${year}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // The data comes back as an array, we take the first element of the array as it contains our country data
        this.setState({
          countryData: data[0],
          isFetchingData: false,
        });
      })
      .catch(() => {
        // There was an error when fetching the data. The component needs to know
        // this so it can remove the "Loading" message.
        this.setState({
          isFetchingData: false,
          isFetchError: true,
        });
      });
  }
}

export default CountryDetails;
