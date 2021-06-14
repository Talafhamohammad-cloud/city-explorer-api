const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
const Wdata = require('./data/weather.json')
app.use(cors())


app.get('/weather-data',(req,res) => {
    res.json(Wdata)
});


app.listen(PORT, () =>{
   console.log(`server started on ${PORT}`)
});

