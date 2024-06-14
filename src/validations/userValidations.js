const { body, validationResult } = require('express-validator');

// Validation for registering a new user
const validateUserRegistration = [
    body('username').isString().isLength({ min: 1, max: 50 }).withMessage('Username must be between 1 and 50 characters long.'),
    body('email').isEmail().withMessage('Invalid email address.').isLength({ max: 100 }).withMessage('Email must be at most 100 characters long.'),
    body('password').isString().isLength({ min: 6, max: 255 }).withMessage('Password must be between 6 and 255 characters long.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for logging in an existing user
const validateUserLogin = [
    body('email').isEmail().withMessage('Invalid email address.'),
    body('password').isString().isLength({ min: 6, max: 255 }).withMessage('Password must be between 6 and 255 characters long.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for updating user profile
const validateUserProfileUpdate = [
    body('full_name').optional().isString().isLength({ max: 100 }).withMessage('Full name must be at most 100 characters long.'),
    body('phone_number').optional().isString().isLength({ max: 20 }).withMessage('Phone number must be at most 20 characters long.'),
    body('profile_picture_url').optional().isURL().withMessage('Invalid URL for profile picture.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateUserProfileUpdate
};
