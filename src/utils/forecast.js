const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=04065eacc8b5dd89c44a975d1cbaa1b4&query=${latitude},${longitude}&units=f`;
    request({ url, json: true }, (error, {body}) => {
        if(error) {
        callback('Unable to connect', undefined);
        } else if(body.current.weather_descriptions.length === 0) {
            console.log('Unable to find forecast.', undefined);
        } else {

        callback(undefined, `${body.current.weather_descriptions[0]}. The current temprature is ${body.current.temperature}. It feels like ${body.current.feelslike}`);
    
    }})
}

module.exports = forecast;