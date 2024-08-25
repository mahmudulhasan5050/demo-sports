import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'member' | 'non-member';
  isPaid: boolean;
  isValid: boolean;
  emailConfirmationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'member', 'non-member'], required: true, default: 'non-member' },
  isPaid: { type: Boolean, default: false },
  isValid: { type: Boolean, required: true, default: false },
  emailConfirmationToken: { type: String },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
});

// // Middleware to hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();

//   const bcrypt = require('bcryptjs');
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model<IUser>('User', userSchema);
export default User;

