const express = require('express');
const router = express.Router();
const couponCtrl = require('../controllers/coupon.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /company/coupons/stats:
 *   get:
 *     summary: Voir les statistiques des coupons de l'entreprise connectée
 *     tags: [Entreprise]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des coupons avec stats
 *       401:
 *         description: Non autorisé
 */
router.get('/company/coupons/stats', protect, restrictTo('entreprise'), couponCtrl.getCompanyCouponStats);

module.exports = router;
