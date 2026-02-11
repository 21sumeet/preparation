import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';
import { users } from '../models/schema.js';
import { eq } from 'drizzle-orm';
import {env} from '../config/env.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';
//import { users } from '../models/schema.js';
import fs from 'fs';
import path from 'path';

// Generate JWT token
const generateToken = (id: string, email: string, role: string): string => {
  return jwt.sign(
    { id, email, role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions
  );
};

// POST /api/v1/auth/register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters',
      });
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()));

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await db
      .insert(users)
      .values({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        profilePic: users.profilePic,
        createdAt: users.createdAt,
      });

    // Generate token
    const token = generateToken(newUser[0].id, newUser[0].email, newUser[0].role);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: newUser[0],
        token,
      },
    });
  } catch (error: any) {
    console.error('Register error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// POST /api/v1/auth/login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Find user
    const foundUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()));

    if (foundUsers.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const user = foundUsers[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// GET /api/v1/auth/me
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const foundUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        profilePic: users.profilePic, //new
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (foundUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      data: foundUsers[0],
    });
  } catch (error: any) {
    console.error('Profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { name } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters',
      });
    }

    const updated = await db
      .update(users)
      .set({
        name: name.trim(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        profilePic: users.profilePic,
        createdAt: users.createdAt,
      });

    if (updated.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updated[0],
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// PUT /api/v1/auth/profile-pic — Upload profile picture
export const uploadProfilePic = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file',
      });
    }

    // Get old profile pic to delete
    const oldUser = await db
      .select({ profilePic: users.profilePic })
      .from(users)
      .where(eq(users.id, userId));

    // Delete old profile pic if exists
    if (oldUser[0]?.profilePic) {
      const oldPath = oldUser[0].profilePic.replace('/uploads/', 'uploads/');
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Save new profile pic path
    const profilePicPath = `/uploads/profiles/${req.file.filename}`;

    const updated = await db
      .update(users)
      .set({
        profilePic: profilePicPath,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        profilePic: users.profilePic,
        createdAt: users.createdAt,
      });

    return res.status(200).json({
      success: true,
      message: 'Profile picture updated successfully',
      data: updated[0],
    });
  } catch (error: any) {
    console.error('Upload profile pic error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// DELETE /api/v1/auth/profile-pic — Remove profile picture
export const removeProfilePic = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // Get current profile pic
    const currentUser = await db
      .select({ profilePic: users.profilePic })
      .from(users)
      .where(eq(users.id, userId));

    // Delete file if exists
    if (currentUser[0]?.profilePic) {
      const filePath = currentUser[0].profilePic.replace('/uploads/', 'uploads/');
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Set profilePic to null
    const updated = await db
      .update(users)
      .set({
        profilePic: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        profilePic: users.profilePic,
        createdAt: users.createdAt,
      });

    return res.status(200).json({
      success: true,
      message: 'Profile picture removed',
      data: updated[0],
    });
  } catch (error: any) {
    console.error('Remove profile pic error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};