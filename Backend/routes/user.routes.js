const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion du profil utilisateur
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Obtenir le profil de l’utilisateur connecté
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Données du profil utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Non autorisé
 */
router.get('/me', protect, userCtrl.getMyProfile);

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Mettre à jour le profil de l’utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nouveau Nom
 *               secteurActivite:
 *                 type: string
 *                 example: Restauration
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 */
router.put('/me', protect, userCtrl.updateProfile);

/**
 * @swagger
 * /users/logo:
 *   post:
 *     summary: Upload du logo de l’entreprise (image)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Logo téléchargé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logo mis à jour
 *       400:
 *         description: Fichier invalide
 *       401:
 *         description: Non autorisé
 */
router.post('/logo', protect, upload.single('logo'), userCtrl.uploadLogo);

module.exports = router;
