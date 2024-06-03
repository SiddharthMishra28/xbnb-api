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

async function deleteUser(userId) {
    await pool.execute('DELETE FROM users WHERE user_id = ?', [userId]);
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser
};
