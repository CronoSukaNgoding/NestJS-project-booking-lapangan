import { Injectable, Inject,NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { Waktu } from './models/waktu';

@Injectable()
export class WaktuService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  // Method to create a new Waktu record
  async create(waktuData: Partial<Waktu>): Promise<Waktu> {
    const [id] = await this.knex('waktu').insert({
      ...waktuData,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.findById(id); // Return the newly created Waktu
  }

  // Method to retrieve all Waktu records
  async findAll(): Promise<Waktu[]> {
    return this.knex('waktu').select('*'); // Fetch all records from 'waktu' table
  }

  // Method to retrieve one Waktu by ID
  async findOne(id: number): Promise<Waktu> {
    const waktu = await this.knex('waktu').where({ id }).first();

    if (!waktu) {
      throw new NotFoundException('Waktu not found');
    }

    return waktu;
  }

  // Optional method to find by ID (used in create)
  private async findById(id: number): Promise<Waktu> {
    return this.knex('waktu').where({ id }).first();
  }
}
