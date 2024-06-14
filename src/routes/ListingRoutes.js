const express = require('express');
const router = express.Router();
const listingController = require('../controllers/ListingController');
const authenticateToken = require('../middleware/AuthMiddleware');
const {
    validateListingCreation,
    validateListingUpdate
} = require('../validations/listingValidations');

/**
 * @swagger
 * tags:
 *   name: Listings
 *   description: Listing management routes
 */

/**
 * @swagger
 * /api/listings:
 *   get:
 *     summary: Get a list of all available listings
 *     tags: [Listings]
 *     responses:
 *       '200':
 *         description: A list of all available listings
 *       '500':
 *         description: Internal server error
 */
router.get('/listings', listingController.getAllListings);

/**
 * @swagger
 * /api/listings/{listing_id}:
 *   get:
 *     summary: Get details of a specific listing by ID
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: listing_id
 *         required: true
 *         description: ID of the listing to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Details of the listing
 *       '404':
 *         description: Listing not found
 *       '500':
 *         description: Internal server error
 */
router.get('/listings/:listing_id', listingController.getListingById);

/**
 * @swagger
 * /api/listings/search/q:
 *   get:
 *     summary: Search listings based on criteria like city, description keyword.
 *     tags: [Listings]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: City to search listings in
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Keyword Match in description
 *     responses:
 *       '200':
 *         description: Search results
 *       '500':
 *         description: Internal server error
 */
router.get('/listings/search/q', listingController.searchListings);

/**
 * @swagger
 * /api/listings/create:
 *   post:
 *     summary: Create a new listing
 *     tags: [Listings]
 *     description: |
 *       Creates a new listing with the provided data.
 *       This endpoint inserts a new listing into the database along with its associated images.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the listing.
 *               description:
 *                 type: string
 *                 description: A detailed description of the listing.
 *               price:
 *                 type: number
 *                 description: The price of the listing.
 *               currency:
 *                 type: string
 *                 description: The currency of the price (e.g., USD, EUR).
 *               city:
 *                 type: string
 *                 description: The city where the listing is located.
 *               country:
 *                 type: string
 *                 description: The country where the listing is located.
 *               address:
 *                 type: string
 *                 description: The address of the listing.
 *               latitude:
 *                 type: number
 *                 description: The latitude coordinate of the listing location.
 *               longitude:
 *                 type: number
 *                 description: The longitude coordinate of the listing location.
 *               host_id:
 *                 type: integer
 *                 description: The ID of the user who is the host of the listing.
 *               listing_images:
 *                 type: array
 *                 description: An array of image URLs associated with the listing.
 *                 items:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Listing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the listing creation.
 *                 listingId:
 *                   type: integer
 *                   description: The ID of the newly created listing.
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
router.post('/listings/create', authenticateToken, validateListingCreation, listingController.createListing);

/**
 * @swagger
 * /api/listings/{listing_id}/update:
 *   put:
 *     summary: Update a listing
 *     tags: [Listings]
 *     description: |
 *       Update a listing with the provided data.
 *       This endpoint updates a listing into the database along with its associated images.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the listing.
 *               description:
 *                 type: string
 *                 description: A detailed description of the listing.
 *               price:
 *                 type: number
 *                 description: The price of the listing.
 *               currency:
 *                 type: string
 *                 description: The currency of the price (e.g., USD, EUR).
 *               city:
 *                 type: string
 *                 description: The city where the listing is located.
 *               country:
 *                 type: string
 *                 description: The country where the listing is located.
 *               address:
 *                 type: string
 *                 description: The address of the listing.
 *               latitude:
 *                 type: number
 *                 description: The latitude coordinate of the listing location.
 *               longitude:
 *                 type: number
 *                 description: The longitude coordinate of the listing location.
 *               host_id:
 *                 type: integer
 *                 description: The ID of the user who is the host of the listing.
 *               listing_images:
 *                 type: array
 *                 description: An array of image URLs associated with the listing.
 *                 items:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Listing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the listing creation.
 *                 listingId:
 *                   type: integer
 *                   description: The ID of the newly created listing.
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
router.put('/listings/:listing_id/update', authenticateToken, validateListingUpdate, listingController.updateListing);

/**
 * @swagger
 * /api/listings/{listing_id}/delete:
 *   delete:
 *     summary: Delete a listing by ID
 *     tags: [Listings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listing_id
 *         required: true
 *         description: ID of the listing to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Listing deleted successfully
 *       '500':
 *         description: Internal server error
 */
router.delete('/listings/:listing_id/delete', authenticateToken, listingController.deleteListing);

module.exports = router;
