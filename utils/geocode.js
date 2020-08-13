const request = require('request')

const geoCode = (address ,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoid2FyZDY2IiwiYSI6ImNrZHJuZWNnOTBqbncycWxpNzN1dm5ia3YifQ.2fhSWlTh7hN7-wvRstiiog&limit=1' // encodeURIComponent is for wierd user inputs

    request({url: url, json: true}, (error, response) => {
        if (error){
            callback('unable to connect to location servecies!', undefined)
        } else if (response.body.features.length === 0) {
            callback('please choose a different location!', undefined)
        } else {
            const data = response.body.features[0]
            const coordinates = {
                latitude: data.center[0],
                longitude: data.center[1]
            } 
            callback(undefined, coordinates)
        }
    })
}

module.exports = geoCode