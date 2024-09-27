import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { Hari } from './models/hari';

@Injectable()
export class HariService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  // Method to create a new Hari
  async create(hariData: any): Promise<Hari> {
    const [id] = await this.knex('hari').insert(hariData); // Insert into 'hari' table and return the new record's ID
    return this.findById(id); // Return the newly created record
  }

  // Method to retrieve all Hari records
  async findAll(): Promise<Hari[]> {
    return this.knex('hari').select('*'); // Fetch all records from the 'hari' table
  }

  // Optional method to find a Hari by ID
  async findById(id: number): Promise<Hari> {
    return this.knex('hari').where({ id }).first(); // Fetch a record by its ID
  }
}
