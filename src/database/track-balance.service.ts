import { Injectable,Inject, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { TrackBalance } from './models/track-balance';

@Injectable()
export class TrackBalanceService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  // Method to create a new TrackBalance record
  async create(trackBalanceData: Partial<TrackBalance>): Promise<TrackBalance> {
    const [id] = await this.knex('track_balance').insert({
      ...trackBalanceData,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.findById(id); // Return the newly created TrackBalance
  }

  // Method to retrieve all TrackBalance records
  async findAll(): Promise<TrackBalance[]> {
    return this.knex('track_balance').select('*'); // Fetch all records from 'track_balance' table
  }

  // Method to retrieve one TrackBalance by ID
  async findOne(id: number): Promise<TrackBalance> {
    const trackBalance = await this.knex('track_balance').where({ id }).first();

    if (!trackBalance) {
      throw new NotFoundException('TrackBalance not found');
    }

    return trackBalance;
  }

  // Optional method to find by ID (used in create)
  private async findById(id: number): Promise<TrackBalance> {
    return this.knex('track_balance').where({ id }).first();
  }
}
