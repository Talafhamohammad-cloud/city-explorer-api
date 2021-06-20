require('dotenv').config();

const indexController = function (req, res) {
    res.send('Hello World')
}

module.exports = indexController;