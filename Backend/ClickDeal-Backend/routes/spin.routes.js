const express = require('express');
const router = express.Router();
const spinCtrl = require('../controllers/spin.controller');
const { protect } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Spin
 *   description: Jeu de la roue pour les utilisateurs
 */

/**
 * @swagger
 * /spin:
 *   post:
 *     summary: Tourner la roue (une fois par jour)
 *     tags: [Spin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Résultat du spin
 */
router.post('/', protect, spinCtrl.spinWheel);

/**
 * @swagger
 * /spin/history:
 *   get:
 *     summary: Voir l’historique des spins de l’utilisateur connecté
 *     tags: [Spin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des coupons gagnés par spin
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "66511ee4b32d9b34a97bb7c0"
 *                   coupon:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "664ff04df27e99c3d88d6ed8"
 *                       title:
 *                         type: string
 *                         example: "Promo -10%"
 *                       description:
 *                         type: string
 *                         example: "Valable dans tous les magasins"
 *                       discount:
 *                         type: number
 *                         example: 10
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-05-21T14:20:00.000Z"
 *       401:
 *         description: Non autorisé
 */
router.get('/history', protect, spinCtrl.getSpinHistory);

module.exports = router;
