require('dotenv').config();
const axios = require('axios');
const Movie = require('../models/movie.model');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Cache = require('../helper/Cache')
const cacheObj = new Cache();


async function displayMovie(req, res) {
    let searchQuery = req.query.query;
    const requestKey = `movies-${searchQuery}`

    if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey] < 86400000)) {
        res.json(cacheObj[requestKey].data)
    } else {
        const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchQuery}`
        const movieDD = await axios.get(movieUrl);
        const movieData = movieDD.data.results.map(movie => {
            return new Movie(movie);
        })
        
        cacheObj[requestKey] = {
            data: movieData
        }
        cacheObj[requestKey].timestamp = Date.now()
        res.status(200).send(movieData)

    }


}


module.exports = displayMovie;