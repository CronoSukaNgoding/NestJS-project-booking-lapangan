import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { Harga } from './models/harga';
import { CreateHargaDto } from '../database/dto/create-harga.dto';

@Injectable()
export class HargaService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}


  async create(hargaData: any): Promise<Harga> {
    const [id] = await this.knex('harga').insert(hargaData); 
    return this.findOne(id); 
  }

  // Method to retrieve all Harga records
  async findAll(): Promise<Harga[]> {
    return this.knex('harga').select('*'); 
  }

  async findOne(id: number): Promise<Harga> {
    return this.knex('group_pembayaran').where({ id }).first();
  }

  async update(id: number, updateHargaDto: Partial<CreateHargaDto>): Promise<{ status: number; data?: Harga; error?: string }> {
    const harga = await this.knex('harga').where({ hargaID: id }).first();

    if (!harga) {
      throw new NotFoundException('Harga not found');
    }

    await this.knex('harga')
      .where({ hargaID: id })
      .update({
        ...updateHargaDto,
        updated_at: new Date(),
      });

    const updatedHarga = await this.findOne(id);
    return { status: 200, data: updatedHarga };
  }


  async remove(id: number): Promise<{ status: number; data?: Harga; error?: string }> {
    const harga = await this.knex('harga').where({ hargaID: id }).first();

    if (!harga) {
      throw new NotFoundException('Harga not found');
    }

    await this.knex('harga').where({ hargaID: id }).delete();
    return { status: 200, data: harga };
  }
}
