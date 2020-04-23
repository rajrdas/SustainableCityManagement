// "https://prodapi.metweb.ie/weather/short/Dublin"

import React from 'react'

class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = { temp: 0,
                       temp_class: '',
                       windspeed: 0,
                       winddir: '',
                       humidity: 0,
                       rainfall: 0,
                       pressure: 0,
                       last_updated: ''
                        };
    }

    componentDidMount() {
        fetch('https://prodapi.metweb.ie/weather/short/Dublin')
            .then(res => res.json())
            .then((data) => {
                this.setState({ temp : data["temperature"],
                                temp_class : data["temperatureClass"],
                                windspeed : data["windSpeed"],
                                winddir : data["canonicalWindDirection"],
                                humidity : data["humidity"],
                                rainfall : data["rainfall"],
                                pressure : data["pressure"],
                                last_updated : data["time"]
                })
            })
    }

    render(){
    return (
        <div>
            <br/>
            <h1>{this.state.temp}° C</h1>
            <p><b>Class    : </b>{this.state.temp_class}</p>
            <p><b>Wind     : </b>{this.state.windspeed} km/hr {this.state.winddir}</p>
            <p><b>Humidity : </b>{this.state.humidity}%</p>
            <p><b>Rainfall : </b>{this.state.rainfall} cm</p>
            <p><b>Pressure : </b>{this.state.pressure} hPa</p>
            <small>Last Updated at {this.state.last_updated}</small>
            <br/><br/>
            <p style={{color: "red"}} >Due to the recent COVID-19 situation, data may be biased and predicated values
            might vary from actual. Please maintain social distance and help prevent the virus.</p>
        </div>



    )
    }

};

export default Weather;
