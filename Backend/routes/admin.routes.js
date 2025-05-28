const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { protect, isAdmin } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Routes réservées à l'administrateur
 */

// Middleware pour sécuriser toutes les routes suivantes
router.use(protect, isAdmin);

/**
 * @swagger
 * /admin/coupons/pending:
 *   get:
 *     summary: Voir tous les coupons en attente de validation
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des coupons en attente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 */
router.get('/coupons/pending', adminController.getPendingCoupons);

/**
 * @swagger
 * /admin/coupons/{id}/approve:
 *   patch:
 *     summary: Approuver un coupon
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du coupon à approuver
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon approuvé avec succès
 *       404:
 *         description: Coupon non trouvé
 */
router.patch('/coupons/:id/approve', adminController.approveCoupon);

/**
 * @swagger
 * /admin/coupons/{id}:
 *   delete:
 *     summary: Supprimer un coupon (modération)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du coupon à supprimer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon supprimé
 *       404:
 *         description: Coupon non trouvé
 */
router.delete('/coupons/:id', adminController.deleteCoupon);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Voir tous les utilisateurs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', adminController.getAllUsers);

module.exports = router;
