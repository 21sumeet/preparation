import { body } from 'express-validator';

export const createContactValidator = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters'),

  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be 2-50 characters'),

  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .matches(/^[+]?[\d\s\-()]{7,20}$/).withMessage('Invalid phone number'),

  body('address')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('Address cannot exceed 255 characters'),
];

export const updateContactValidator = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters'),

  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be 2-50 characters'),

  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('phone')
    .optional()
    .trim()
    .matches(/^[+]?[\d\s\-()]{7,20}$/).withMessage('Invalid phone number'),

  body('address')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('Address cannot exceed 255 characters'),
];