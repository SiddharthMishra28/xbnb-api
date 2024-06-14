const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authenticateToken = require('../middleware/AuthMiddleware');
const { validateUserProfileUpdate } = require('../validations/userValidations');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get current user's profile information
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.get('/users/profile', authenticateToken, userController.getProfile);

/**
 * @swagger
 * /api/users/update_profile:
 *   put:
 *     summary: Update current user's profile information
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               profile_picture_url:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *       '500':
 *         description: Internal server error
 */
router.put('/users/update_profile', authenticateToken, validateUserProfileUpdate, userController.updateProfile);

/**
 * @swagger
 * /api/users/delete_account:
 *   delete:
 *     summary: Delete current user's account
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Account deleted successfully
 *       '500':
 *         description: Internal server error
 */
router.delete('/users/delete_account', authenticateToken, userController.deleteAccount);

module.exports = router;
