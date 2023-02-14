const express = require('express');

const loginRoute = require('./login');
const worldRoute = require('./world');

var { LocalStorage } = require('node-localstorage');
var localStorage = new LocalStorage('./local_storage');

const router = express.Router();

module.exports = (params) => {

    router.get('/', async (req, res, next) => {
        try {
            var username = localStorage.getItem('username');
            console.log("username: ", username);
            if (username === "" || username === null) {
                return res.redirect('/login');
            }
            else {
                res.render('layout', { pageTitle: 'Home', template: 'index', username });
            }
        }
        catch (err) {
            return next(err);
        }
    });

    router.use('/login', loginRoute(params));
    router.use('/world', worldRoute(params));

    return router;
}


