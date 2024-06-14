const { body, param, validationResult } = require('express-validator');

// Validation for creating a new review
const validateReviewCreation = [
    body('booking_id').isInt().withMessage('Booking ID must be an integer.'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5.'),
    body('comment').optional().isString(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for updating a review
const validateReviewUpdate = [
    param('review_id').isInt().withMessage('Review ID must be an integer.'),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5.'),
    body('comment').optional().isString(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateReviewCreation,
    validateReviewUpdate
};
