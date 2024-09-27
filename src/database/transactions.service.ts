import { Injectable,BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { v4 as uuidv4 } from 'uuid';
import { Transaction, TransactionDocument } from './schemas/transactions';

@Injectable()
export class TransactionService {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}

  async create(transactionData: Partial<Transaction>): Promise<Transaction> {
    const newLapangan = new this.transactionModel({
      ...transactionData,
      lapanganID: uuidv4(), // Generate UUID
      created_at: new Date(),
      updated_at: new Date(),
    });
    return newLapangan.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }

  async findOne(id: string): Promise<Transaction> {
    return this.transactionModel.findById(id).exec();
  }

  async update(id: string, updateLapanganDto: Partial<CreateTransactionDto>): Promise<{ status : number; data?: Transaction; error?: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const data = await this.transactionModel.findByIdAndUpdate(id, updateLapanganDto, { new: true }).exec();

    if (!data) {
      throw new NotFoundException('data not found');
    }

    return { status:200, data };
  }

  async remove(id: string): Promise<{ status: number; data?: Transaction; error?: string }> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ID format');
      }

      const data = await this.transactionModel.findByIdAndDelete(id).exec();

      if (!data) {
        throw new NotFoundException('data not found');
      }

      return { status: 200, data };
    } catch (error) {
      return { status: 400, error: error.message };
    }
  }
}
