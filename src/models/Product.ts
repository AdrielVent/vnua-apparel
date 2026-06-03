import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  specs: {
    material: string;
    gsm: number;
    tolerance: string;
  };
  stripeProductId: string;
  stripePriceId: string;
  printfulSyncId?: number;
  inStock: boolean;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  images: [{ type: String }],
  specs: {
    material: String,
    gsm: Number,
    tolerance: String,
  },
  stripeProductId: { type: String, required: true },
  stripePriceId: { type: String, required: true },
  printfulSyncId: { type: Number },
  inStock: { type: Boolean, default: true },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
