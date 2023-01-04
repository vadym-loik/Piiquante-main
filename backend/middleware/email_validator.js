const validEmail = require('email-validator');

module.exports = (req, res, next) => {
  if (!validEmail.validate(req.body.email)) {
    return res
      .status(400)
      .json({ message: 'Please enter a valid email address!' });
  } else {
    next();
  }
};
