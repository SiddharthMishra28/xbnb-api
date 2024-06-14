const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/BookingController');
const authenticateToken = require('../middleware/AuthMiddleware');
const {
    validateBookingCreation,
    validateBookingUpdate
} = require('../validations/bookingValidations');

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management routes
 */

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get a list of all bookings made by the current user
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of all bookings made by the current user
 *       '500':
 *         description: Internal server error
 */
router.get('/bookings', authenticateToken, bookingController.getUserBookings);

/**
 * @swagger
 * /api/bookings/create:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     description: |
 *       Creates a new booking with the provided data.
 *       This endpoint inserts a new booking into the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listing_id:
 *                 type: integer
 *                 description: The ID of the listing being booked.
 *               check_in_date:
 *                 type: string
 *                 format: date
 *                 description: The check-in date for the booking.
 *               check_out_date:
 *                 type: string
 *                 format: date
 *                 description: The check-out date for the booking.
 *               total_price:
 *                 type: number
 *                 description: The total price of the booking.
 *               currency:
 *                 type: string
 *                 description: The currency of the booking (e.g., USD, EUR).
 *               num_guests:
 *                 type: integer
 *                 description: The number of guests for the booking.
 *     responses:
 *       '201':
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the booking creation.
 *                 bookingId:
 *                   type: integer
 *                   description: The ID of the newly created booking.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the failure due to an internal server error.
 */
router.post('/bookings/create', authenticateToken, validateBookingCreation, bookingController.createBooking);

/**
 * @swagger
 * /api/bookings/{booking_id}:
 *   get:
 *     summary: Get details of a specific booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: booking_id
 *         required: true
 *         description: ID of the booking to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Details of the booking
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Internal server error
 */
router.get('/bookings/:booking_id', bookingController.getBookingById);

/**
 * @swagger
 * /api/bookings/{booking_id}/update:
 *   put:
 *     summary: Updates a booking for logged in user
 *     tags: [Bookings]
 *     description: |
 *       Updates a booking with the provided data.
 *       This endpoint updates booking into the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listing_id:
 *                 type: integer
 *                 description: The ID of the listing being booked.
 *               check_in_date:
 *                 type: string
 *                 format: date
 *                 description: The check-in date for the booking.
 *               check_out_date:
 *                 type: string
 *                 format: date
 *                 description: The check-out date for the booking.
 *               total_price:
 *                 type: number
 *                 description: The total price of the booking.
 *               currency:
 *                 type: string
 *                 description: The currency of the booking (e.g., USD, EUR).
 *               num_guests:
 *                 type: integer
 *                 description: The number of guests for the booking.
 *     responses:
 *       '201':
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the booking creation.
 *                 bookingId:
 *                   type: integer
 *                   description: The ID of the newly created booking.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the failure due to an internal server error.
 */
router.put('/bookings/:booking_id/update', authenticateToken, validateBookingUpdate, bookingController.updateBooking);

/**
 * @swagger
 * /api/bookings/{booking_id}/cancel:
 *   delete:
 *     summary: Cancel a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: booking_id
 *         required: true
 *         description: ID of the booking to cancel
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Booking canceled successfully
 *       '500':
 *         description: Internal server error
 */
router.delete('/bookings/:booking_id/cancel', authenticateToken, bookingController.cancelBooking);

module.exports = router;
