const httpStatus = require('http-status');

const validateFields = (schema) => (req, res, next) => {
  const data = req.body;
  const result = schema.validate(data);
  if (!result.error) {
    return next();
  }

  return res.status(httpStatus[404]).json({
    message: 'There are invalid fields',
  });
};

module.exports = {
  validateFields,
};
