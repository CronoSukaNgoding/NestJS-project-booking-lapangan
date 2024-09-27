import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateHargaDto } from '../database/dto/create-harga.dto';
import { Knex } from 'knex';
import { Harga } from '../database/models/harga';
import { v4 as uuidv4 } from 'uuid';

@Controller('/harga')
export class HargaController {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  @Post()
  async create(@Body() createHargaDto: CreateHargaDto): Promise<{ status: number; data: Harga }> {
    const { lapangan_id, waktuID, hariID, harga } = createHargaDto;
    const hargaID = uuidv4();

    const newHarga = {
      hargaID,
      lapangan_id,
      waktuID,
      hariID,
      harga,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const [insertedId] = await this.knex('harga').insert(newHarga);

    const [data] = await this.knex('harga').where({ hargaID: insertedId }).select('*');
    

    return { status: HttpStatus.OK, data }; 
  }

  @Get()
  async findAll(): Promise<{ status: number; data: Harga[] }> {
    const data = await this.knex('harga').select('*');
    return { status: HttpStatus.OK, data };
  }

  @Get(':id')
  async findOne(@Param('id') hargaID: string): Promise<{ status: number; data: Harga }> {
    const data = await this.knex('harga').where({ hargaID }).first();

    if (!data) {
      throw new HttpException('Harga not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data };
  }

  @Put(':id')
  async update(@Param('id') hargaID: string, @Body() createHargaDto: CreateHargaDto): Promise<{ status: number; data: Harga }> {
    const updatedHarga = {
      ...createHargaDto,
      updated_at: new Date(),
    };

    await this.knex('harga')
      .where({ hargaID })
      .update(updatedHarga);

    const result = await this.knex('harga')
      .where({ hargaID })
      .select('*');

    if (result.length === 0) {
      throw new HttpException('Harga not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data: result[0] };
  }

  @Delete(':id')
  async remove(@Param('id') hargaID: string): Promise<{ status: number; message: string }> {
    const result = await this.knex('harga').where({ hargaID }).del();

    if (result === 0) {
      throw new HttpException('Harga not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, message: 'Harga deleted successfully' };
  }
}
