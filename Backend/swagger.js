const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ClickDeal API',
      version: '1.0.0',
      description: 'Documentation de l’API ClickDeal',
    },
    servers: [
      {
        url: 'http://localhost:8080/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            role: {
              type: 'string',
              enum: ['entreprise', 'consommateur', 'admin'],
            },
            secteurActivite: { type: 'string' },
          },
        },
        Coupon: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            discount: { type: 'number' },
            category: { type: 'string' },
            location: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            conditions: { type: 'string' },
            isActive: { type: 'boolean' },
            approved: { type: 'boolean' },
            views: { type: 'number' },
            downloads: { type: 'number' },
            conversions: { type: 'number' },
            company: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js','./models/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
