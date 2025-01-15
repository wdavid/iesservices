const { body } = require("express-validator");
const validators = {};

validators.createPostValidators = [
  body("userId").notEmpty().isMongoId().withMessage("Invalid userId"),
  body("fecha").notEmpty().isDate().withMessage("Invalid fecha"),
  body("title")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Title is required and must be a string"),
  body("description")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Description is required and must be a string"),
  body("images")
    .optional()
    .custom((value, { req }) => {
      if (req.files && req.files.length > 0) {
        return true; // Si hay imágenes, es válido
      } else if (!req.files) {
        return true; // Si no hay imágenes, es válido porque es opcional
      }
      throw new Error("Images must be uploaded");
    }),
];

module.exports = validators;
