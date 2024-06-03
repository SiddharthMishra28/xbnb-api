const listingModel = require('../models/ListingModel');

async function getAllListings(req, res) {
    try {
        const listings = await listingModel.getAllListings();
        res.json(listings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getListingById(req, res) {
    try {
        const { listing_id } = req.params;
        const listing = await listingModel.getListingById(listing_id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json(listing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function searchListings(req, res) {
    try {
        const criteria = req.query;
        const listings = await listingModel.searchListings(criteria);
        res.json(listings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createListing(req, res) {
    try {
        const listingData = req.body;
        const listingId = await listingModel.createListing(listingData);
        res.status(201).json({ message: 'Listing created successfully', listingId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateListing(req, res) {
    try {
        const { listing_id } = req.params;
        const updatedData = req.body;
        await listingModel.updateListing(listing_id, updatedData);
        res.json({ message: `Listing ${listing_id} updated successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteListing(req, res) {
    try {
        const { listing_id } = req.params;
        await listingModel.deleteListing(listing_id);
        res.json({ message: `Listing ${listing_id} deleted successfully` });
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

module.exports = {
    getAllListings,
    getListingById,
    searchListings,
    createListing,
    updateListing,
    deleteListing,
    getListingStatistics,
    getPopularListings,
    getListingPerformance
};
