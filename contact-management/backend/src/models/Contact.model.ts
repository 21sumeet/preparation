import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address?: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters'],
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[+]?[\d\s\-()]{7,20}$/, 'Please enter a valid phone number'],
    },
    address: {
      type: String,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
  },
  {
    timestamps: true,
  }
);

// No duplicate email 
contactSchema.index({ userId: 1, email: 1 }, { unique: true, sparse: true });

// Faster search when filtering by userId
contactSchema.index({ userId: 1 });

export const Contact = mongoose.model<IContact>('Contact', contactSchema);