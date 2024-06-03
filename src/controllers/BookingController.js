const bookingModel = require('../models/BookingModel');

async function getUserBookings(req, res) {
    try {
        const userId = req.user.userId;
        const bookings = await bookingModel.getUserBookings(userId);
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createBooking(req, res) {
    try {
        const { listing_id, check_in_date, check_out_date, total_price, currency, num_guests } = req.body;
        const userId = req.user.userId;
        const bookingData = { user_id: userId, listing_id, check_in_date, check_out_date, total_price, currency, num_guests };
        const bookingId = await bookingModel.createBooking(bookingData);
        res.status(201).json({ message: 'Booking created successfully', bookingId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getBookingById(req, res) {
    try {
        const { booking_id } = req.params;
        const booking = await bookingModel.getBookingById(booking_id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateBooking(req, res) {
    try {
        const { booking_id } = req.params;
        const updatedData = req.body;
        await bookingModel.updateBooking(booking_id, updatedData);
        res.json({ message: `Booking ${booking_id} updated successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function cancelBooking(req, res) {
    try {
        const { booking_id } = req.params;
        await bookingModel.cancelBooking(booking_id);
        res.json({ message: `Booking ${booking_id} canceled successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUserBookings,
    createBooking,
    getBookingById,
    updateBooking,
    cancelBooking
};
