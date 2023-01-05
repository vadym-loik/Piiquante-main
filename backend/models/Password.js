const validPassword = require('password-validator');
const pwSchema = new validPassword();

// password model
pwSchema
  .is()
  .min(8)
  .is()
  .max(15)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(['1Aaaaaaa', '2Bbbbbbb']);

module.exports = pwSchema;
