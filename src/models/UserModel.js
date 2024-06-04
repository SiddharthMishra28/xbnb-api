const pool = require('../config/db');

async function createUser(username, email, passwordHash) {
    const [rows, fields] = await pool.execute('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, passwordHash]);
    return rows.insertId;
}

async function getUserByEmail(email) {
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

async function getUserById(userId) {
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE user_id = ?', [userId]);
    return rows[0];
}

async function updateUser(userId, userData) {
    const { full_name, phone_number, profile_picture_url } = userData;
    await pool.execute('UPDATE users SET full_name = ?, phone_number = ?, profile_picture_url = ? WHERE user_id = ?', [full_name, phone_number, profile_picture_url, userId]);
}

async function updatePassword(user_id, temporaryPasswordHash) {
    await pool.execute('UPDATE users SET password_hash = ? WHERE user_id = ?', [temporaryPasswordHash, user_id]);
}

async function updatePasswordByEmail(email, PasswordHash) {
    await pool.execute('UPDATE users SET password_hash = ? WHERE email = ?', [PasswordHash, email]);
}

async function deleteUser(userId) {
    await pool.execute('DELETE FROM users WHERE user_id = ?', [userId]);
}

async function getUserStatistics() {
    try {
        const [rows] = await pool.query('SELECT COUNT(*) AS total_users FROM users');
        const totalUsers = rows[0].total_users;

        const [signupRows] = await pool.query('SELECT DATE(created_at) AS date, COUNT(*) AS signups FROM users GROUP BY DATE(created_at)');
        const newSignups = signupRows.map(row => ({ date: row.date, signups: row.signups }));

        return { totalUsers, newSignups };
    } catch (error) {
        throw error;
    }
}

async function getTopUsers() {
    try {
        const [rows] = await pool.query(`
            SELECT u.user_id, COUNT(*) AS total_reviews 
            FROM reviews r
            JOIN bookings b ON r.booking_id = b.booking_id
            JOIN users u ON b.user_id = u.user_id
            GROUP BY u.user_id 
            ORDER BY total_reviews DESC 
            LIMIT 10
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
    updatePassword,
    updatePasswordByEmail,
    getUserStatistics,
    getTopUsers
};
