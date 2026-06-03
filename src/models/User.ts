import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name?: string;
  shippingAddress?: {
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  stripeCustomerId?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  shippingAddress: {
    line1: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
  },
  stripeCustomerId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
