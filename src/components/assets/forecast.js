import React from 'react';


class ForecastComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      forecast: [],
      location: null,
      btn: "Show"
    }
    this.weatherRef = React.createRef()
    this.fetchWeather = this.fetchWeather.bind(this)
  }
    componentDidMount(){
      this.fetchWeather()

    }
    
    fetchWeather(){
      fetch('/api/weather/forecast/load').then(res => res.json()).then(data => this.setState({forecast: data.list, 
                                                                                            location: data.name}))
    }

    render(){
        console.log(this.state.forecast);
        let visibleForecast = [];
        let realForecast = this.state.forecast;
        for(var i=4; i<this.state.forecast.length; i=i+8){
            visibleForecast.push(realForecast[i])
        }
        let forecast = visibleForecast.map(data => {
            var d = new Date(data.dt_txt.substring(0,10))
            var weekdays = [
              'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
            ]
            console.log(d.getDay())

            var OldWeatherArr = data.weather[0].description.split(" ");

            var description = OldWeatherArr.map(word => {
              
              return (word[0].toUpperCase() + word.slice(1))
            }).join(' ')
            return (<div style={{...{fontSize: '1.07em'},...{fontWeight: '400'}}}>
                      <p><b>{weekdays[d.getDay()]}: {data.dt_txt.substring(0, 10)} </b></p>
                      <p></p>
                      <h3>{Math.round(data.main.temp)} &#8451;</h3>
                      <p>{description}</p>
                     
                      <hr style={{border: '0.5px solid #b7b7b7'}}/>
                    </div>
            )
            }
                
        )

        
    

      return(
        <div className='card p-3' style={{marginTop: '15px'}}>
          <div style={{textAlign: 'center'}}>
            <h3>
              Forecast
            </h3>
            <hr style={{border: '0.5px solid #b7b7b7'}}/>
            <div style={{cursor: 'pointer'}} onClick={() => {
                                  if(this.weatherRef.current.style.display === 'none'){
                                    this.weatherRef.current.style.display = 'block';
                                    this.setState({btn: "Hide"})
                                  } else {
                                    this.weatherRef.current.style.display = 'none'
                                    this.setState({btn: "Show"});
                                  }

                               
                                }}>
              {this.state.btn}
            </div>

            <div ref={this.weatherRef} id='forecast' style={{display: 'none'}}>
            <hr style={{border: '0.5px solid #b7b7b7'}}/>

              {forecast}
            </div>

          </div>  
        </div>

      );
    }

}

export default ForecastComponent;