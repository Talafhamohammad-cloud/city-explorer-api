require('dotenv').config();
const express = require('express') 
const cors = require('cors');
const app = express() 
const weatherController = require('./controller/weather.controller');
const movieController = require('./controller/movie.controller');
const indexController = require('./controller/indes.controller')
app.use(cors()) 

const PORT = process.env.PORT;


app.get('/', indexController);

app.get('/weather', weatherController);

app.get('/movies', movieController);

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})