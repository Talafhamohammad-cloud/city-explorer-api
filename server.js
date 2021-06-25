const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT;
var cors = require('cors');
const weatherData = require('./assets/weather.json')
app.options('*', cors())
app.use(cors())


app.get('/weather-data', (req, res) => {
    res.json(weatherData)
});




app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
});