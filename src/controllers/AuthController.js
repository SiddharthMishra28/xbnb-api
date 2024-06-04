const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const userModel = require('../models/UserModel');
const { JWT_SECRET } = require('dotenv').config().parsed;

// async function register(req, res) {
//     try {
//         const { username, email, password } = req.body;
//         const saltRounds = 10;
//         const passwordHash = await bcrypt.hash(password, saltRounds);
//         const userId = await userModel.createUser(username, email, passwordHash);
//         res.status(201).json({ message: 'User registered successfully', userId });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const userId = await userModel.createUser(username, email, passwordHash);

        // Sending welcome email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cheers4rzx@gmail.com', // your Gmail address
                pass: 'kcvd jlng bpza nbhu' // your Gmail password
            }
        });

        const mailOptions = {
            from: 'cheers4rzx@gmail.com',
            to: email,
            subject: 'Welcome to Vista Properties API',
            html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome to Vista Properties API</title>
                    <style>
                        /* Reset styles */
                        body, html {
                            margin: 0;
                            padding: 0;
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        /* Container styles */
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        /* Heading styles */
                        h1 {
                            color: #007bff;
                        }
                        /* Link styles */
                        a {
                            color: #007bff;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Welcome to Vista Properties API</h1>
                        <p>Dear ${username},</p>
                        <p>We are delighted to welcome you to Vista Properties API! Your gateway to efficient property management and seamless integration.</p>
                        <p>To get started, please use the following link to access our API documentation:</p>
                        <p><a href="[API_LINK]">Vista Properties API Documentation</a></p>
                        <p>If you have any questions or need assistance, feel free to contact our support team at support@vistaproperties.com.</p>
                        <p>Best regards,<br>The Vista Properties Team</p>
                    </div>
                </body>
                </html>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending welcome email:', error.message);
            } else {
                console.log('Welcome email sent successfully!');
            }
        });

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

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        
        // Check if the email exists in the database
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Generate a new temporary password
        const temporaryPassword = Math.random().toString(36).slice(-8); // Generate an 8-character random string
        const saltRounds = 10;
        const temporaryPasswordHash = await bcrypt.hash(temporaryPassword, saltRounds);
        
        // Update user's password with the temporary password hash
        await userModel.updatePassword(user.user_id, temporaryPasswordHash);
        
        // Send the temporary password via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cheers4rzx@gmail.com', // your Gmail address
                pass: 'kcvd jlng bpza nbhu' // your Gmail password
            }
        });

        const mailOptions = {
            from: 'your@gmail.com',
            to: email,
            subject: 'Temporary Password for Vista Properties',
            text: `Your temporary password for Vista Properties API is: ${temporaryPassword}. Please log in and change your password immediately.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending temporary password email:', error.message);
                return res.status(500).json({ message: 'Error sending temporary password email' });
            } else {
                console.log('Temporary password email sent successfully!');
                return res.status(200).json({ message: 'Temporary password sent successfully' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function changePassword(req, res) {
    try {
        const { email, currentPassword, newPassword } = req.body;

        // Check if the user exists
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current password is correct
        const passwordMatch = await bcrypt.compare(currentPassword, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password
        const saltRounds = 10;
        const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

        // Update user's password in the database
        await userModel.updatePasswordByEmail(email, newPasswordHash);

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    changePassword
};
