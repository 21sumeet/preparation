import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createContactValidator, updateContactValidator } from '../middlewares/contact.validator.js';
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../controllers/contact.controller.js';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts of logged-in user
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search contacts by first name, last name, or email
 *         example: john
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, date]
 *         description: Sort contacts by field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: Contacts fetched successfully
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
 *                       updatedAt:
 *                         type: string
 *                 total:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/', createContactValidator, validate, createContact);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jane
 *                 minLength: 2
 *                 maxLength: 50
 *               lastName:
 *                 type: string
 *                 example: Doe
 *                 minLength: 2
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 example: jane@example.com
 *                 description: Optional - must be unique per user
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *                 description: Must start with 7, 8, or 9
 *               address:
 *                 type: string
 *                 example: Mumbai, India
 *                 description: Optional
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Validation error (missing or invalid fields)
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Contact with this email already exists
 *       500:
 *         description: Internal server error
 */
router.get('/', getContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     tags: [Contacts]
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
 *         description: Contact fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getContactById);


/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update an existing contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jane Updated
 *               lastName:
 *                 type: string
 *                 example: Doe Updated
 *               email:
 *                 type: string
 *                 example: jane.updated@example.com
 *               phone:
 *                 type: string
 *                 example: "8876543210"
 *               address:
 *                 type: string
 *                 example: Delhi, India
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Contact not found
 *       409:
 *         description: Another contact with this email already exists
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateContactValidator, validate, updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
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
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteContact);

export default router;