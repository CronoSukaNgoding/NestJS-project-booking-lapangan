import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateLapanganDto } from '../database/dto/create-lapangan.dto';
import { Knex } from 'knex';
import { Lapangan } from '../database/models/lapangan';
import { v4 as uuidv4 } from 'uuid';

@Controller('/lapangan')
export class LapanganController {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  @Post()
  async create(@Body() createLapanganDto: CreateLapanganDto): Promise<{ status: number; data: Lapangan }> {
    const { namaLapangan, kategori, gambar, status } = createLapanganDto;
    const lapanganID = uuidv4();

    const newLapangan = {
      lapanganID,
      namaLapangan,
      kategori,
      gambar,
      status,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const [insertedId] = await this.knex('lapangan').insert(newLapangan);

    const [data] = await this.knex('lapangan').where({ lapanganID: insertedId }).select('*');
    

    return { status: HttpStatus.OK, data }; 
  }

  @Get()
  async findAll(): Promise<{ status: number; data: Lapangan[] }> {
    const data = await this.knex('lapangan').select('*');
    return { status: HttpStatus.OK, data };
  }

  @Get(':id')
  async findOne(@Param('id') lapanganID: string): Promise<{ status: number; data: Lapangan }> {
    const data = await this.knex('lapangan').where({ lapanganID }).first();

    if (!data) {
      throw new HttpException('Lapangan not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data };
  }

  @Put(':id')
  async update(@Param('id') lapanganID: string, @Body() createLapanganDto: CreateLapanganDto): Promise<{ status: number; data: Lapangan }> {
    const updatedLapangan = {
      ...createLapanganDto,
      updated_at: new Date(),
    };

    await this.knex('lapangan')
      .where({ lapanganID })
      .update(updatedLapangan);

    const result = await this.knex('lapangan')
      .where({ lapanganID })
      .select('*');
      
    if (result.length === 0) {
      throw new HttpException('Lapangan not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data: result[0] };
  }

  @Delete(':id')
  async remove(@Param('id') lapanganID: string): Promise<{ status: number; message: string }> {
    const result = await this.knex('lapangan').where({ lapanganID }).del();

    if (result === 0) {
      throw new HttpException('Lapangan not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, message: 'Lapangan deleted successfully' };
  }
}
