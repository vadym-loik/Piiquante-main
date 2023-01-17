const express = require('express');

// Routing with Express in Node: Express.js has an “app” object corresponding to HTTP. We define the routes by using the methods of this “app” object. This app object specifies a callback function, which is called when a request is received. We have different methods in app object for a different type of request.
const router = express.Router();
const validEmail = require('../middleware/email_validator');
const validPassword = require('../middleware/password-validator');
const userCtrl = require('../controllers/user');

//routes for signup and login
router.post('/signup', validEmail, validPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
