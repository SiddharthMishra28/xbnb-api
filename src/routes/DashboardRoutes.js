const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authenticateToken = require('../middleware/AuthMiddleware');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard insights endpoints
 */

/**
 * @swagger
 * /api/dashboard/user_statistics:
 *   get:
 *     summary: Get statistics about users
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Returns user statistics
 */
router.get('/user_statistics', authenticateToken, dashboardController.getUserStatistics);

/**
 * @swagger
 * /api/dashboard/top_users:
 *   get:
 *     summary: Get a list of top users based on criteria
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Returns a list of top users
 */
router.get('/top_users', authenticateToken, dashboardController.getTopUsers);

/**
 * @swagger
 * /api/dashboard/listing_statistics:
 *   get:
 *     summary: Get statistics about listings
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Returns listing statistics
 */
router.get('/listing_statistics', authenticateToken, dashboardController.getListingStatistics);

/**
 * @swagger
 * /api/dashboard/popular_listings:
 *   get:
 *     summary: Get a list of popular listings
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Returns a list of popular listings
 */
router.get('/popular_listings', authenticateToken, dashboardController.getPopularListings);

/**
 * @swagger
 * /api/dashboard/listing_performance:
 *   get:
 *     summary: Get performance metrics for listings
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Returns listing performance metrics
 */
router.get('/listing_performance', authenticateToken, dashboardController.getListingPerformance);

/**
 * @swagger
 * /api/dashboard/booking_statistics:
 *   get:
 *     summary: Get statistics about bookings.
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: A JSON object with booking statistics.
 */
router.get('/booking_statistics', authenticateToken, dashboardController.getBookingStatistics);

/**
 * @swagger
 * /api/dashboard/booking_trends:
 *   get:
 *     summary: Get trends in booking activity over time.
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: A JSON object with booking trends.
 */
router.get('/booking_trends', authenticateToken, dashboardController.getBookingTrends);

/**
 * @swagger
 * /api/dashboard/booking_revenue:
 *   get:
 *     summary: Get revenue insights.
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: A JSON object with revenue insights.
 */
router.get('/booking_revenue', authenticateToken, dashboardController.getBookingRevenue);

/**
 * @swagger
 * /api/dashboard/review_statistics:
 *   get:
 *     summary: Get review insights.
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: A JSON object with revenue insights.
 */
router.get('/review_statistics', authenticateToken, dashboardController.getReviewStatistics);

/**
 * @swagger
 * /api/dashboard/review_trends:
 *   get:
 *     summary: Get review trends.
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: A JSON object with revenue insights.
 */
router.get('/review_trends', authenticateToken, dashboardController.getReviewTrends);

module.exports = router;
