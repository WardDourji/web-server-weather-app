const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=918a0eee51dbe17701f9330593c6790e&query='+latitude+','+longitude+''

    request({url: url, json: true}, (error, response) => {
        if (error){
            callback("unable to connect to geocoding services", undefined)
        } else if (response.body.error){
            callback(response.body.error.info, undefined)
        } else {
            const data = {
                temperature: response.body.current.temperature,
                weatherDiscription: response.body.current.weather_descriptions[0]
            }

            callback(undefined,  data)
        }
    })

}

module.exports = forecast