import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  checkoutID: number;

  @Prop({ required: true })
  transactionID: string;

  @Prop({ required: true })
  userID: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  payMethod: string;

  @Prop({ required: true })
  waktuID: string;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
