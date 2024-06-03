const userModel = require('../models/UserModel');

async function getProfile(req, res) {
    try {
        const userId = req.user.userId;
        const user = await userModel.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateProfile(req, res) {
    try {
        const userId = req.user.userId;
        const { full_name, phone_number, profile_picture_url } = req.body;
        await userModel.updateUser(userId, { full_name, phone_number, profile_picture_url });
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteAccount(req, res) {
    try {
        const userId = req.user.userId;
        await userModel.deleteUser(userId);
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getProfile,
    updateProfile,
    deleteAccount
};
