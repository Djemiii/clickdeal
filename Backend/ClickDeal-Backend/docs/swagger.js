
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ClickDeal API',
      version: '1.0.0',
      description: 'API de la plateforme ClickDeal - Coupons pour entreprises locales'
    },
    servers: [{ url: 'http://localhost:5000/api' }]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;
