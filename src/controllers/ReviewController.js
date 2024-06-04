const reviewModel = require('../models/ReviewModel');

async function getUserReviews(req, res) {
    try {
        const userId = req.user.userId;
        const reviews = await reviewModel.getUserReviews(userId);
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createReview(req, res) {
    try {
        const { booking_id, rating, comment } = req.body;
        const userId = req.user.userId;
        const reviewData = { user_id: userId, booking_id, rating, comment };
        const reviewId = await reviewModel.createReview(reviewData);
        res.status(201).json({ message: 'Review created successfully', reviewId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getReviewById(req, res) {
    try {
        const { review_id } = req.params;
        const review = await reviewModel.getReviewById(review_id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateReview(req, res) {
    try {
        const { review_id } = req.params;
        const updatedData = req.body;
        await reviewModel.updateReview(review_id, updatedData);
        res.json({ message: `Review ${review_id} updated successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteReview(req, res) {
    try {
        const { review_id } = req.params;
        await reviewModel.deleteReview(review_id);
        res.json({ message: `Review ${review_id} deleted successfully` });
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

async function getReviewSentiment(req, res) {
    try {
        const reviewSentiment = await reviewModel.getReviewSentiment();
        res.json(reviewSentiment);
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
    getUserReviews,
    createReview,
    getReviewById,
    updateReview,
    deleteReview,
    getReviewStatistics,
    getReviewSentiment,
    getReviewTrends
};
