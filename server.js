const express = require('express')
const app = express()
const axios = require('axios')

require('dotenv').config();
const PORT = process.env.PORT;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
var cors = require('cors');
const weatherData = require('./assets/weather.json');
const { response } = require('express');

app.options('*', cors())
app.use(cors())


app.get('/', (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;

     if (lat && lon) {
         const responseData = weatherData.data.map(obj => new Weather(obj));
         const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;

        axios.get(weatherBitUrl).then(response => {
            
            res.json(response.data)
        }).catch(error => {
            res.send(error.message)
        });
        res.json(responseData)
    } else {
        res.send('please provide the proper lat and lon')
    }


});

class Weather {
    constructor(weatherData) {
        this.description = weatherData.weather.description
        this.date = weatherData.valid_date

    }
}




app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
});