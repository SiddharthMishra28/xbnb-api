const express = require('express');
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../swaggerOptions');

dotenv.config();

const app = express();

app.use(express.json());

const authRoutes = require('./routes/AuthRoutes');
const userRoutes = require('./routes/UserRoutes');
const listingRoutes = require('./routes/ListingRoutes');
const bookingRoutes = require('./routes/BookingRoutes');
const reviewRoutes = require('./routes/ReviewRoutes');
const dashboardRoutes = require('./routes/DashboardRoutes');

// Swagger setup
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Endpoint to serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', listingRoutes);
app.use('/api', bookingRoutes);
app.use('/api', reviewRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
