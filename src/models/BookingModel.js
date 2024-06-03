const pool = require('../config/db');

async function getUserBookings(userId) {
    const [rows, fields] = await pool.execute('SELECT * FROM bookings WHERE user_id = ?', [userId]);
    return rows;
}

async function createBooking(bookingData) {
    const { user_id, listing_id, check_in_date, check_out_date, total_price, currency, num_guests } = bookingData;
    const [rows, fields] = await pool.execute(
        'INSERT INTO bookings (user_id, listing_id, check_in_date, check_out_date, total_price, currency, num_guests) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [user_id, listing_id, check_in_date, check_out_date, total_price, currency, num_guests]
    );
    return rows.insertId;
}

async function getBookingById(bookingId) {
    const [rows, fields] = await pool.execute('SELECT * FROM bookings WHERE booking_id = ?', [bookingId]);
    return rows[0];
}

async function updateBooking(bookingId, updatedData) {
    const { check_in_date, check_out_date, total_price, currency, num_guests } = updatedData;
    await pool.execute(
        'UPDATE bookings SET check_in_date = ?, check_out_date = ?, total_price = ?, currency = ?, num_guests = ? WHERE booking_id = ?',
        [check_in_date, check_out_date, total_price, currency, num_guests, bookingId]
    );
}

async function cancelBooking(bookingId) {
    await pool.execute('DELETE FROM bookings WHERE booking_id = ?', [bookingId]);
}

async function getBookingStatistics() {
    const [rows] = await pool.query('SELECT COUNT(*) AS totalBookings FROM bookings');
    return rows[0];
}

async function getBookingTrends() {
    const [rows] = await pool.query(`
        SELECT DATE_FORMAT(booking_date, '%Y-%m-%d') AS date, COUNT(*) AS bookingsCount
        FROM bookings
        GROUP BY DATE_FORMAT(booking_date, '%Y-%m-%d')
        ORDER BY DATE_FORMAT(booking_date, '%Y-%m-%d') DESC
    `);
    return rows;
}

async function getBookingRevenue() {
    const [rows] = await pool.query(`
        SELECT DATE_FORMAT(booking_date, '%Y-%m') AS month, SUM(total_price) AS totalRevenue
        FROM bookings
        GROUP BY DATE_FORMAT(booking_date, '%Y-%m')
        ORDER BY DATE_FORMAT(booking_date, '%Y-%m') DESC
    `);
    return rows;
}

module.exports = {
    getUserBookings,
    createBooking,
    getBookingById,
    updateBooking,
    cancelBooking,
    getBookingStatistics,
    getBookingTrends,
    getBookingRevenue
};
