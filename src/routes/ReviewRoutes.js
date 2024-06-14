const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authenticateToken = require('../middleware/AuthMiddleware');
const {
    validateReviewCreation,
    validateReviewUpdate
} = require('../validations/reviewValidations');

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management routes
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get a list of all reviews made by the current user
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of all reviews made by the current user
 *       '500':
 *         description: Internal server error
 */
router.get('/reviews', authenticateToken, reviewController.getUserReviews);

/**
 * @swagger
 * /api/reviews/create:
 *   post:
 *     summary: Create a new review for a booking
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               booking_id:
 *                 type: integer
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Review created successfully
 *       '500':
 *         description: Internal server error
 */
router.post('/reviews/create', authenticateToken, validateReviewCreation, reviewController.createReview);

/**
 * @swagger
 * /api/reviews/{review_id}:
 *   get:
 *     summary: Get details of a specific review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: review_id
 *         required: true
 *         description: ID of the review to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Details of the review
 *       '404':
 *         description: Review not found
 *       '500':
 *         description: Internal server error
 */
router.get('/reviews/:review_id', reviewController.getReviewById);

/**
 * @swagger
 * /api/reviews/{review_id}/update:
 *   put:
 *     summary: Update details of a specific review by ID
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: review_id
 *         required: true
 *         description: ID of the review to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Review updated successfully
 *       '500':
 *         description: Internal server error
 */
router.put('/reviews/:review_id/update', authenticateToken, validateReviewUpdate, reviewController.updateReview);

/**
 * @swagger
 * /api/reviews/{review_id}/delete:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: review_id
 *         required: true
 *         description: ID of the review to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Review deleted successfully
 *       '500':
 *         description: Internal server error
 */
router.delete('/reviews/:review_id/delete', authenticateToken, reviewController.deleteReview);

module.exports = router;
