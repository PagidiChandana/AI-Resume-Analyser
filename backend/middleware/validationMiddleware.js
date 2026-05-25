const validateRequiredFields = (fields) => (req, res, next) => {
  const missingFields = fields.filter((field) => {
    const value = req.body[field];
    return value === undefined || value === null || String(value).trim() === "";
  });

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: missingFields.map((field) => `${field} is required`)
    });
  }

  next();
};

module.exports = {
  validateRequiredFields
};
