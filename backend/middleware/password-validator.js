const pwSchema = require('../models/Password');

module.exports = (req, res, next) => {
  if (!pwSchema.validate(req.body.password)) {
    return res.status(400).json({
      message:
        'The password must contain between 8 and 15 characters, with at least one caps, one min and one digit!',
    });
  } else {
    next();
  }
};
