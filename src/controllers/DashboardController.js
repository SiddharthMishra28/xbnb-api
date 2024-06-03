const reviewModel = require('../models/ReviewModel');
const userModel = require('../models/UserModel');
const listingModel = require('../models/ListingModel');
const bookingModel = require('../models/BookingModel');

async function getUserStatistics(req, res) {
    try {
        const userStats = await userModel.getUserStatistics();
        res.json(userStats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getTopUsers(req, res) {
    try {
        const topUsers = await userModel.getTopUsers();
        res.json(topUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getListingStatistics(req, res) {
    try {
        const listingStats = await listingModel.getListingStatistics();
        res.json(listingStats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getPopularListings(req, res) {
    try {
        const popularListings = await listingModel.getPopularListings();
        res.json(popularListings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getListingPerformance(req, res) {
    try {
        const listingPerformance = await listingModel.getListingPerformance();
        res.json(listingPerformance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getBookingStatistics(req, res) {
    try {
        const bookingStats = await bookingModel.getBookingStatistics();
        res.json(bookingStats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getBookingTrends(req, res) {
    try {
        const bookingTrends = await bookingModel.getBookingTrends();
        res.json(bookingTrends);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getBookingRevenue(req, res) {
    try {
        const bookingRevenue = await bookingModel.getBookingRevenue();
        res.json(bookingRevenue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function getReviewStatistics(req, res) {
    try {
        const reviewStats = await reviewModel.getReviewStatistics();
        res.json(reviewStats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getReviewTrends(req, res) {
    try {
        const reviewTrends = await reviewModel.getReviewTrends();
        res.json(reviewTrends);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUserStatistics,
    getTopUsers,
    getListingStatistics,
    getPopularListings,
    getListingPerformance,
    getBookingStatistics,
    getBookingTrends,
    getBookingRevenue,
    getReviewStatistics,
    getReviewTrends
};
