require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 8080;

// Connexion DB puis lancement serveur
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(` Serveur lancé sur http://localhost:${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});
