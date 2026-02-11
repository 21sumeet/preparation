import { Router } from 'express';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware.js';
import { getAllUsers, getAllContacts, deleteAnyContact } from '../controllers/admin.controller.js';

const router = Router();
router.use(authMiddleware);
router.use(adminMiddleware);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all registered users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                         enum: [USER, ADMIN]
 *                       createdAt:
 *                         type: string
 *                 total:
 *                   type: number
 *       401:
 *         description: Unauthorized - No token or invalid token
 *       403:
 *         description: Forbidden - Admin access only
 *       500:
 *         description: Internal server error
 */
router.get('/users', getAllUsers);

/**
 * @swagger
 * /admin/contacts:
 *   get:
 *     summary: Get all contacts across all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All contacts fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       address:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                 total:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access only
 *       500:
 *         description: Internal server error
 */
router.get('/contacts', getAllContacts);

/**
 * @swagger
 * /admin/contacts/{id}:
 *   delete:
 *     summary: Delete any contact regardless of owner (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID (UUID)
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access only
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.delete('/contacts/:id', deleteAnyContact);

export default router;