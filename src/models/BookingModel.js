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

module.exports = {
    getUserBookings,
    createBooking,
    getBookingById,
    updateBooking,
    cancelBooking
};
