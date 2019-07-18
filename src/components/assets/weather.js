import React from 'react';


class WeatherComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      temperature: null,
      weather: [],
      location: null
    }
    this.weatherRef = React.createRef()
    this.fetchWeather = this.fetchWeather.bind(this)
  }
    componentDidMount(){
      this.fetchWeather()
    }
    fetchWeather(){
      fetch('/api/weather/load').then(res => res.json()).then(data => this.setState({temperature: data.main.temp, 
                                                                                    weather: data.weather,
                                                                                    location: data.name}))
    }

    render(){
      console.log(this.state.weather[0]);
      let weather = this.state.weather.map(data => 
          { 
            let a = data.description.split(" ");
            return(
              
               a.map(word => {
                return word[0].toUpperCase() + word.slice(1)
                }).join(' ')
            
            )
          }
        )
      if(weather == "Light Rain" || "Moderate Rain"){
        var weatherIcon = <img src="https://img.icons8.com/color/96/000000/light-rain.png"/>           

      }

      return(
        <div className='card p-3 sidecards' style={{height: ''}}>
          <div style={{textAlign: 'center'}}>
            <h3>
              {this.state.location} 
            </h3>
            {weatherIcon}
            <h1>
            {Math.round(this.state.temperature)} &#8451;

            </h1>
            <h3 ref={this.weatherRef} id="weather">
              {weather}
            </h3>
            
          </div>  
        </div>

      );
    }

}

export default WeatherComponent;