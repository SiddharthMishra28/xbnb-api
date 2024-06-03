const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Vista Properties and Stays',
        version: '1.0.0',
        description: 'An API for Properties and Homestays Listings',
      },
      servers: [
        {
          url: 'http://localhost:3000', // Base URL of your API
        },
      ],
    },
    apis: ['./src/app.js', './src/routes/*.js'], // Files where Swagger-JSDoc should look for definitions
};

module.exports = swaggerOptions;
  