const express = require('express');
const router = express.Router();
const validEmail = require('../middleware/email_validator');
const validPassword = require('../middleware/password-validator');
const userCtrl = require('../controllers/user');

//routes for signup and login
router.post('/signup', validEmail, validPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
