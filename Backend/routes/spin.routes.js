// routes/spin.routes.js

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
 *     summary: Tourner la roue (max 3 fois par jour)
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
 *         description: Liste des coupons gagnés ou perdus
 */
router.get('/history', protect, spinCtrl.getMySpinHistory);

/**
 * @swagger
 * /spin/info:
 *   get:
 *     summary: Obtenir le nombre de tours restants pour aujourd'hui
 *     tags: [Spin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Infos sur les possibilités de spin restantes
 */
router.get('/info', protect, spinCtrl.getSpinInfo);


module.exports = router;
