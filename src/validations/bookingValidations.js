const { body, param, validationResult } = require('express-validator');

// Validation for creating a new booking
const validateBookingCreation = [
    body('user_id').isInt().withMessage('User ID must be an integer.'),
    body('listing_id').isInt().withMessage('Listing ID must be an integer.'),
    body('check_in_date').isDate().withMessage('Check-in date must be a valid date.'),
    body('check_out_date').isDate().withMessage('Check-out date must be a valid date.'),
    body('total_price').isDecimal().withMessage('Total price must be a decimal number.'),
    body('currency').isString().isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-character string.'),
    body('num_guests').isInt().withMessage('Number of guests must be an integer.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for updating a booking
const validateBookingUpdate = [
    param('booking_id').isInt().withMessage('Booking ID must be an integer.'),
    body('check_in_date').optional().isDate().withMessage('Check-in date must be a valid date.'),
    body('check_out_date').optional().isDate().withMessage('Check-out date must be a valid date.'),
    body('total_price').optional().isDecimal().withMessage('Total price must be a decimal number.'),
    body('currency').optional().isString().isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-character string.'),
    body('num_guests').optional().isInt().withMessage('Number of guests must be an integer.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateBookingCreation,
    validateBookingUpdate
};
