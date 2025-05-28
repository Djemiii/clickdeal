const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const couponRoutes = require('./routes/coupon.routes');
const spinRoutes = require('./routes/spin.routes');
const adminRoutes = require('./routes/admin.routes');

const errorHandler = require('./middlewares/error.middleware');
const setupSwagger = require('./swagger');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Fichiers statiques (logos, QR codes, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes principales
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/spin', spinRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', require('./routes/notification.route'));

// Swagger Docs
setupSwagger(app);

// Gestion globale des erreurs
app.use(errorHandler);

module.exports = app;
