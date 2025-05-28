const express = require('express');
const router = express.Router();
const couponCtrl = require('../controllers/coupon.controller');
const { protect, isAdmin } = require('../middlewares/auth.middleware');
const checkCompanyProfileComplete = require('../middlewares/checkCompanyProfileComplete');

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Gestion des coupons
 */

/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Liste paginée des coupons avec filtres
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Numéro de page (par défaut 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre d’éléments par page (par défaut 15)
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Recherche dans le titre ou la description
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Catégorie du coupon
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Localisation du coupon
 *       - in: query
 *         name: companyName
 *         schema:
 *           type: string
 *         description: Nom de l’entreprise
 *     responses:
 *       200:
 *         description: Liste des coupons
 */
router.get('/', couponCtrl.getAllCoupons);

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     summary: Obtenir un coupon par ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du coupon
 *     responses:
 *       200:
 *         description: Détails du coupon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon non trouvé
 */
router.get('/:id', couponCtrl.getCouponById);

/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: Créer un nouveau coupon (entreprise)
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               discount:
 *                 type: number
 *               category:
 *                 type: string
 *               location:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               conditions:
 *                 type: string
 *             required:
 *               - title
 *               - discount
 *               - category
 *     responses:
 *       201:
 *         description: Coupon créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 */
router.post('/', protect, checkCompanyProfileComplete, couponCtrl.createCoupon);

/**
 * @swagger
 * /coupons/{id}:
 *   put:
 *     summary: Mettre à jour un coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du coupon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               discount:
 *                 type: number
 *               category:
 *                 type: string
 *               location:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               conditions:
 *                 type: string
 *     responses:
 *       200:
 *         description: Coupon mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Coupon non trouvé
 */
router.put('/:id', protect, couponCtrl.updateCoupon);

/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Supprimer un coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du coupon
 *     responses:
 *       200:
 *         description: Coupon supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Coupon non trouvé
 */
router.delete('/:id', protect, couponCtrl.deleteCoupon);
router.post('/:id/view', couponCtrl.incrementView);
router.post('/:id/download', couponCtrl.incrementDownload);
/**
 * @swagger
 * /coupons/getmycoupons:
 *   get:
 *     summary: Voir tous les coupons de l’entreprise connectée
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des coupons de l’entreprise
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 *       401:
 *         description: Non autorisé
 */

router.get('/mine', protect, couponCtrl.getMyCoupons);

module.exports = router;
