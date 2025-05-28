const express = require('express');
const router = express.Router();
const notificationCtrl = require('../controllers/notification.controller');
const { protect } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notifications utilisateurs
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Obtenir les notifications de l'utilisateur connecté
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "spin_won"
 *                       message:
 *                         type: string
 *                         example: "Félicitations ! Vous avez gagné un coupon !"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Non autorisé
 */

router.get('/', protect, notificationCtrl.getMyNotifications);

module.exports = router;
