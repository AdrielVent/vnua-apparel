import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId?: mongoose.Types.ObjectId;
  stripeSessionId: string;
  paymentStatus: string;
  amountTotal: number;
  currency: string;
  items: Array<{
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }>;
  fulfillmentStatus: 'pending' | 'sent_to_printful' | 'shipped' | 'delivered';
  printfulOrderId?: number;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  stripeSessionId: { type: String, required: true, unique: true },
  paymentStatus: { type: String, required: true },
  amountTotal: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
  }],
  fulfillmentStatus: { 
    type: String, 
    enum: ['pending', 'sent_to_printful', 'shipped', 'delivered'],
    default: 'pending' 
  },
  printfulOrderId: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
