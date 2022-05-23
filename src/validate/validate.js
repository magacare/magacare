const validateFields = (schema) => (req, res, next) => {
  const data = req.body;
  const { error } = schema.validate(data);
  if(!error) {
    return next();
  }
  return res.status(400).send({ error: error.details[0].message });
};

module.exports = {
  validateFields,
};
