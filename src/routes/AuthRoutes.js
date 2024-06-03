const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const authenticateToken = require('../middleware/AuthMiddleware');

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
router.post('/register', authController.register);

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
router.post('/login', authController.login);

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

module.exports = router;
