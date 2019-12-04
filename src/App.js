import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = 'e091fff3f8e3f791f442a48960501083';

class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async ( e ) => {
    e.preventDefault();

    const city    = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const apiCall = await fetch( `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${ API_KEY }` );
    const data = await apiCall.json();
    console.log( data );

    if ( city && country ) {
      this.setState( {
        temperature: ( data.main && data.main.temp ) ? data.main.temp : '',
        city: ( data.name ) ? data.name : '',
        country: ( data.sys && data.sys.country ) ? data.sys.country : '',
        humidity: ( data.main && data.main.humidity ) ? data.main.humidity : '',
        description: ( data.weather && data.weather[0].description ) ? data.weather[0].description : '',
        error: (data.message) ? data.message : ''
      } );
    } else {
      this.setState( {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter the value...'
      } );
    }
  };

  render() {
    return(
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-sm-12 title-container">
                  <Titles />
                </div>
                <div className="col-md-7 col-sm-12 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default App;
