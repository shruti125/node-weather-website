const request = require('request');

const geocode = (address, callback) => 
{const urlgeocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3MxMjUiLCJhIjoiY2trdHZwejF0MHozdTJwcDZwZDhwYnBqeCJ9.vpL27REJRn5O4YfLDKUMRg&limit=1';

request({ url: urlgeocode, json: true }, (error, response) => {
    if (error) {
        callback('Unable to connect', undefined);
    }
    else if(response.body.features.length === 0 ){
        callback('Unable to find location. Try another search.', undefined);
    } else {
        callback(undefined, {
            location: response.body.features[0].place_name,
            longitude: response.body.features[0].center[0],
            latitude: response.body.features[0].center[1]});
    }
})};

module.exports = geocode;
