const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/UserModel');
const { JWT_SECRET } = require('dotenv').config().parsed;

async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const userId = await userModel.createUser(username, email, passwordHash);
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user.user_id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

function logout(req, res) {
    res.json({ message: 'Logout successful' });
}

module.exports = {
    register,
    login,
    logout
};
