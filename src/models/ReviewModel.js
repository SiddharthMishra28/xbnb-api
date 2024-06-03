const pool = require('../config/db');

async function getUserReviews(userId) {
    const [rows, fields] = await pool.execute('SELECT * FROM reviews WHERE booking_id IN (SELECT booking_id FROM bookings WHERE user_id = ?)', [userId]);
    return rows;
}

async function createReview(reviewData) {
    const { booking_id, rating, comment } = reviewData;
    const review_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const [rows, fields] = await pool.execute(
        'INSERT INTO reviews (booking_id, rating, comment, review_date) VALUES (?, ?, ?, ?)',
        [booking_id, rating, comment, review_date]
    );
    return rows.insertId;
}

async function getReviewById(reviewId) {
    const [rows, fields] = await pool.execute('SELECT * FROM reviews WHERE review_id = ?', [reviewId]);
    return rows[0];
}

async function updateReview(reviewId, updatedData) {
    const { rating, comment } = updatedData;
    await pool.execute(
        'UPDATE reviews SET rating = ?, comment = ? WHERE review_id = ?',
        [rating, comment, reviewId]
    );
}

async function deleteReview(reviewId) {
    await pool.execute('DELETE FROM reviews WHERE review_id = ?', [reviewId]);
}

module.exports = {
    getUserReviews,
    createReview,
    getReviewById,
    updateReview,
    deleteReview
};
