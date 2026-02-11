import type { Response } from 'express';
import { db } from '../config/database.js';
import { contacts } from '../models/schema.js';
import { eq, and, or, ilike, desc, asc } from 'drizzle-orm';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

// POST /api/v1/contacts — Create contact
export const createContact = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { firstName, lastName, email, phone, address } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name and phone are required',
      });
    }

    // Check duplicate email for same user
    if (email) {
      const existing = await db
        .select()
        .from(contacts)
        .where(and(eq(contacts.userId, userId), eq(contacts.email, email.toLowerCase())));

      if (existing.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Contact with this email already exists',
        });
      }
    }

    // Create contact
    const newContact = await db
      .insert(contacts)
      .values({
        firstName,
        lastName,
        email: email ? email.toLowerCase() : null,
        phone,
        address: address || null,
        userId,
      })
      .returning();

    return res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: newContact[0],
    });
  } catch (error: any) {
    console.error('Create contact error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// GET /api/v1/contacts — Get all contacts of logged-in user
export const getContacts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { search, sortBy, sortOrder } = req.query;

    // Base query — only this user's contacts
    let query = db
      .select()
      .from(contacts)
      .where(eq(contacts.userId, userId));

    // Search by name or email
    if (search && typeof search === 'string') {
      query = db
        .select()
        .from(contacts)
        .where(
          and(
            eq(contacts.userId, userId),
            or(
              ilike(contacts.firstName, `%${search}%`),
              ilike(contacts.lastName, `%${search}%`),
              ilike(contacts.email, `%${search}%`)
            )
          )
        );
    }

    const result = await query;

    // Sort results
    let sortedResult = result;
    if (sortBy === 'name') {
      sortedResult = result.sort((a, b) => {
        const nameA = a.firstName.toLowerCase();
        const nameB = b.firstName.toLowerCase();
        return sortOrder === 'desc' ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
      });
    } else if (sortBy === 'date') {
      sortedResult = result.sort((a, b) => {
        return sortOrder === 'desc'
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contacts fetched successfully',
      data: sortedResult,
      total: sortedResult.length,
    });
  } catch (error: any) {
    console.error('Get contacts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// GET /api/v1/contacts/:id — Get single contact
export const getContactById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    //const { id } = req.params;
    const id = req.params.id as string;
    
    const contact = await db
      .select()
      .from(contacts)
      .where(and(eq(contacts.id, id), eq(contacts.userId, userId)));

    if (contact.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact fetched successfully',
      data: contact[0],
    });
  } catch (error: any) {
    console.error('Get contact error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// PUT /api/v1/contacts/:id — Update contact
export const updateContact = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    //const { id } = req.params;
    const id = req.params.id as string;
    const { firstName, lastName, email, phone, address } = req.body;

    // Check if contact exists and belongs to user
    const existing = await db
      .select()
      .from(contacts)
      .where(and(eq(contacts.id, id), eq(contacts.userId, userId)));

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    // Check duplicate email (exclude current contact)
    if (email) {
      const duplicate = await db
        .select()
        .from(contacts)
        .where(
          and(
            eq(contacts.userId, userId),
            eq(contacts.email, email.toLowerCase())
          )
        );

      if (duplicate.length > 0 && duplicate[0].id !== id) {
        return res.status(409).json({
          success: false,
          message: 'Another contact with this email already exists',
        });
      }
    }

    // Update contact
    const updated = await db
      .update(contacts)
      .set({
        firstName: firstName || existing[0].firstName,
        lastName: lastName || existing[0].lastName,
        email: email ? email.toLowerCase() : existing[0].email,
        phone: phone || existing[0].phone,
        address: address !== undefined ? address : existing[0].address,
        updatedAt: new Date(),
      })
      .where(and(eq(contacts.id, id), eq(contacts.userId, userId)))
      .returning();

    return res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: updated[0],
    });
  } catch (error: any) {
    console.error('Update contact error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// DELETE /api/v1/contacts/:id — Delete contact
export const deleteContact = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    //const { id } = req.params;
    const id = req.params.id as string;

    // Check if contact exists and belongs to user
    const existing = await db
      .select()
      .from(contacts)
      .where(and(eq(contacts.id, id), eq(contacts.userId, userId)));

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    await db
      .delete(contacts)
      .where(and(eq(contacts.id, id), eq(contacts.userId, userId)));

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