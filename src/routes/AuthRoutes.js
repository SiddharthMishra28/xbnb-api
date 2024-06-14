const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const authenticateToken = require('../middleware/AuthMiddleware');
const {
    validateUserRegistration,
    validateUserLogin
} = require('../validations/userValidations');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '500':
 *         description: Internal server error
 */
router.post('/register', validateUserRegistration, authController.register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Logged in successfully
 *       '401':
 *         description: Invalid email or password
 *       '500':
 *         description: Internal server error
 */
router.post('/login', validateUserLogin, authController.login);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Logout successful
 */
router.post('/logout', authenticateToken, authController.logout);

/**
 * @swagger
 * /api/forgot_password:
 *   post:
 *     summary: Forgot Password function for user
 *     tags: [Auth]
 *     responses:
 *       '200':
 *         description: API Mails the user with a temporary password
 */
router.post('/forgot_password', authController.forgotPassword);

/**
 * @swagger
 * /update_password:
 *   post:
 *     summary: Change user password
 *     tags: [Auth]
 *     description: Change user password after verifying current password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: email id
 *               currentPassword:
 *                 type: string
 *                 description: Current password
 *               newPassword:
 *                 type: string
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized, current password is incorrect
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/update_password', authenticateToken, authController.changePassword);

module.exports = router;
