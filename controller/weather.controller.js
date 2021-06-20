require('dotenv').config();
const axios = require('axios');
const Weather = require('../models/weather.model')
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const Cache = require('../helper/Cache')
const cacheObj = new Cache();
const weatherController = (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const requestKey = `weather-${lat}-${lon}`
    console.log('requestKey', requestKey);
    if (lat && lon) {


        if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey] < 86400000)) {
            res.json(cacheObj[requestKey])
        } else {
            const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`

            axios.get(weatherBitUrl).then(responce => {
                const responceData = responce.data.data.map(obj => new Weather(obj))



                cacheObj[requestKey] = {
                    data: responceData
                }
                cacheObj[requestKey].timestamp = Date.now()

                res.json(responceData)
            }).catch(error => {
                res.send(error.message)
            })

        }



    } else {
        res.send('please provide the proper lat and lon')
    }
}

module.exports = weatherController;