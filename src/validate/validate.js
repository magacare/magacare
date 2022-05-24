const validateFields = (schema) => (req, res, next) => {
  const data = req.body;
  const { error } = schema.validate(data);
  if(!error) {
    return next();
  }
  return res.status(400).send({ error: error.details[0].message });
};

const verifyExistsData = async (Database, value) => {
  const data = await Database.findOne(value);
  return data;
};

const verifyExistsManyData = async (Database, value) => {
  const data = await Database.find(value);
  return data;
};

module.exports = {
  validateFields,
  verifyExistsData,
  verifyExistsManyData,
};
