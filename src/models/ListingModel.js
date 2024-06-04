const pool = require('../config/db');

async function getAllListings() {
    const [rows, fields] = await pool.execute('SELECT * FROM listings');
    return rows;
}

async function getListingById(listingId) {
    const [rows, fields] = await pool.execute('SELECT * FROM listings WHERE listing_id = ?', [listingId]);
    return rows[0];
}

async function searchListings(criteria) {
    const { city, description } = criteria;
    let query = 'SELECT * FROM listings WHERE 1';

    // Add filters for city and description match
    const queryParams = [];
    if (city) {
        query += ' AND city = ?';
        queryParams.push(city);
    }
    if (description) {
        query += ' AND description LIKE ?';
        queryParams.push(`%${description}%`);
    }

    try {
        const [rows, fields] = await pool.execute(query, queryParams);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function createListing(listingData) {
    const {
        title,
        description,
        price,
        currency,
        city,
        country,
        address,
        latitude,
        longitude,
        host_id,
        listing_images // This will be an array of image URLs
    } = listingData;

    // Start a transaction to ensure data integrity
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        // Insert listing into listings table
        const [listingRows, listingFields] = await connection.execute(
            'INSERT INTO listings (title, description, price, currency, city, country, address, latitude, longitude, host_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title, description, price, currency, city, country, address, latitude, longitude, host_id]
        );

        const listingId = listingRows.insertId;

        // Insert listing images into listing_images table
        if (listing_images && listing_images.length > 0) {
            // Generate placeholders for image values
            const imagePlaceholders = Array(listing_images.length).fill('(?, ?)').join(',');
            const imageValues = listing_images.flatMap(image_url => [listingId, image_url]);
            await connection.execute(
                `INSERT INTO listing_images (listing_id, image_url) VALUES ${imagePlaceholders}`,
                imageValues
            );
        }

        await connection.commit(); // Commit transaction
        return listingId;
    } catch (error) {
        await connection.rollback(); // Rollback transaction if any error occurs
        throw error;
    } finally {
        connection.release(); // Release connection back to the pool
    }
}

async function updateListing(listingId, updatedData) {
    const { title, description, price, currency, city, country, address, latitude, longitude, listing_images } = updatedData;

    // Start a transaction to ensure data integrity
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        // Update listing details in listings table
        await connection.execute(
            'UPDATE listings SET title = ?, description = ?, price = ?, currency = ?, city = ?, country = ?, address = ?, latitude = ?, longitude = ? WHERE listing_id = ?',
            [title, description, price, currency, city, country, address, latitude, longitude, listingId]
        );

        // Delete existing listing images
        await connection.execute('DELETE FROM listing_images WHERE listing_id = ?', [listingId]);

        // Insert updated listing images into listing_images table
        if (listing_images && listing_images.length > 0) {
            // Generate placeholders for image values
            const imagePlaceholders = Array(listing_images.length).fill('(?, ?)').join(',');
            const imageValues = listing_images.flatMap(image_url => [listingId, image_url]);
            await connection.execute(
                `INSERT INTO listing_images (listing_id, image_url) VALUES ${imagePlaceholders}`,
                imageValues
            );
        }

        await connection.commit(); // Commit transaction
    } catch (error) {
        await connection.rollback(); // Rollback transaction if any error occurs
        throw error;
    } finally {
        connection.release(); // Release connection back to the pool
    }
}

async function deleteListing(listingId) {
    await pool.execute('DELETE FROM listings WHERE listing_id = ?', [listingId]);
}

async function getListingStatistics() {
    try {
        const [totalListingsRows] = await pool.query('SELECT COUNT(*) AS total_listings FROM listings');
        const totalListings = totalListingsRows[0].total_listings;

        const [newListingsRows] = await pool.query('SELECT DATE(created_at) AS date, COUNT(*) AS new_listings FROM listings GROUP BY DATE(created_at)');
        const newListings = newListingsRows.map(row => ({ date: row.date, new_listings: row.new_listings }));

        return { totalListings, newListings };
    } catch (error) {
        throw error;
    }
}

async function getPopularListings() {
    try {
        const [popularListingsRows] = await pool.query('SELECT listing_id, COUNT(*) AS bookings_count FROM bookings GROUP BY listing_id ORDER BY bookings_count DESC LIMIT 10');

        return popularListingsRows;
    } catch (error) {
        throw error;
    }
}

async function getListingPerformance() {
    try {
        const [averagePriceRow] = await pool.query('SELECT AVG(price) AS average_price FROM listings');
        const averagePrice = averagePriceRow[0].average_price;

        // Add more performance metrics as needed
        // Example: occupancy rate, average rating, etc.

        return { averagePrice };
    } catch (error) {
        throw error;
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
