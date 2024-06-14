const { body, param, validationResult } = require('express-validator');

// Validation for creating a new listing
const validateListingCreation = [
    body('title').isString().isLength({ min: 1, max: 255 }).withMessage('Title must be between 1 and 255 characters long.'),
    body('description').optional().isString(),
    body('price').isDecimal().withMessage('Price must be a decimal number.'),
    body('currency').isString().isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-character string.'),
    body('city').isString().isLength({ max: 100 }).withMessage('City must be at most 100 characters long.'),
    body('country').isString().isLength({ max: 100 }).withMessage('Country must be at most 100 characters long.'),
    body('address').optional().isString(),
    body('latitude').optional().isDecimal().withMessage('Latitude must be a decimal number.'),
    body('longitude').optional().isDecimal().withMessage('Longitude must be a decimal number.'),
    body('host_id').isInt().withMessage('Host ID must be an integer.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for updating a listing
const validateListingUpdate = [
    param('listing_id').isInt().withMessage('Listing ID must be an integer.'),
    body('title').optional().isString().isLength({ min: 1, max: 255 }).withMessage('Title must be between 1 and 255 characters long.'),
    body('description').optional().isString(),
    body('price').optional().isDecimal().withMessage('Price must be a decimal number.'),
    body('currency').optional().isString().isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-character string.'),
    body('city').optional().isString().isLength({ max: 100 }).withMessage('City must be at most 100 characters long.'),
    body('country').optional().isString().isLength({ max: 100 }).withMessage('Country must be at most 100 characters long.'),
    body('address').optional().isString(),
    body('latitude').optional().isDecimal().withMessage('Latitude must be a decimal number.'),
    body('longitude').optional().isDecimal().withMessage('Longitude must be a decimal number.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateListingCreation,
    validateListingUpdate
};
