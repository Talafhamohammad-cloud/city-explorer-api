class Movie {
    constructor(movie) {
        this.title = movie.title;
        this.overview = movie.overview;
        this.averageVotes = movie.vote_average;
        this.totalVotes = movie.vote_count;
        this.img = movie.poster_path;
        this.popularity = movie.popularity;
        this.released = movie.released_on;
    }
}

module.exports = Movie;