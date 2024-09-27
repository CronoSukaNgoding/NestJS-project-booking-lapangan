import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { Lapangan } from './models/lapangan';
import { CreateLapanganDto } from './dto/create-lapangan.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LapanganService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}


  async create(lapanganData: Partial<Lapangan>): Promise<Lapangan> {
    const lapanganID = uuidv4(); // Generate UUID
    const [id] = await this.knex('lapangan').insert({
      ...lapanganData,
      lapanganID,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.findById(id); 
  }


  async findAll(): Promise<Lapangan[]> {
    return this.knex('lapangan').select('*'); 
  }


  async findOne(id: string): Promise<Lapangan> {
    const lapangan = await this.knex('lapangan').where({ lapanganID: id }).first();

    if (!lapangan) {
      throw new NotFoundException('Lapangan not found');
    }

    return lapangan;
  }


  async update(id: string, updateLapanganDto: Partial<CreateLapanganDto>): Promise<{ status: number; data?: Lapangan; error?: string }> {
    const lapangan = await this.knex('lapangan').where({ lapanganID: id }).first();

    if (!lapangan) {
      throw new NotFoundException('Lapangan not found');
    }

    await this.knex('lapangan')
      .where({ lapanganID: id })
      .update({
        ...updateLapanganDto,
        updated_at: new Date(),
      });

    const updatedLapangan = await this.findOne(id);
    return { status: 200, data: updatedLapangan };
  }


  async remove(id: string): Promise<{ status: number; data?: Lapangan; error?: string }> {
    const lapangan = await this.knex('lapangan').where({ lapanganID: id }).first();

    if (!lapangan) {
      throw new NotFoundException('Lapangan not found');
    }

    await this.knex('lapangan').where({ lapanganID: id }).delete();
    return { status: 200, data: lapangan };
  }


  private async findById(id: number): Promise<Lapangan> {
    return this.knex('lapangan').where({ id }).first();
  }
}
