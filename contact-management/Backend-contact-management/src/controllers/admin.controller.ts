import type { Response } from 'express';
import { db } from '../config/database.js';
import { contacts, users } from '../models/schema.js';
import { eq } from 'drizzle-orm';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

// GET /api/v1/admin/users — Get all users
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users);

    return res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: allUsers,
      total: allUsers.length,
    });
  } catch (error: any) {
    console.error('Get users error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// GET /api/v1/admin/contacts — Get ALL contacts (all users)
export const getAllContacts = async (req: AuthRequest, res: Response) => {
  try {
    const allContacts = await db
      .select({
        id: contacts.id,
        firstName: contacts.firstName,
        lastName: contacts.lastName,
        email: contacts.email,
        phone: contacts.phone,
        address: contacts.address,
        userId: contacts.userId,
        createdAt: contacts.createdAt,
      })
      .from(contacts);

    return res.status(200).json({
      success: true,
      message: 'All contacts fetched successfully',
      data: allContacts,
      total: allContacts.length,
    });
  } catch (error: any) {
    console.error('Get all contacts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// DELETE /api/v1/admin/contacts/:id — Delete any contact
export const deleteAnyContact = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    // Check if contact exists
    const existing = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, id));

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    await db.delete(contacts).where(eq(contacts.id, id));

    return res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
      data: null,
    });
  } catch (error: any) {
    console.error('Delete contact error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};