import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateWaktuDto } from '../database/dto/create-waktu.dto';
import { Knex } from 'knex';
import { Waktu } from '../database/models/waktu';
import { v4 as uuidv4 } from 'uuid';

@Controller('/waktu')
export class WaktuController {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  @Post()
  async create(@Body() createWaktuDto: CreateWaktuDto): Promise<{ status: number; data: Waktu }> {
    const { pukul, status } = createWaktuDto;
    const waktuID = uuidv4();

    const newHarga = {
      waktuID,
      pukul,
      status,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const [insertedId] = await this.knex('waktu').insert(newHarga);

    const [data] = await this.knex('waktu').where({ waktuID: insertedId }).select('*');
    

    return { status: HttpStatus.OK, data }; 
  }

  @Get()
  async findAll(): Promise<{ status: number; data: Waktu[] }> {
    const data = await this.knex('waktu').select('*');
    return { status: HttpStatus.OK, data };
  }

  @Get(':id')
  async findOne(@Param('id') waktuID: string): Promise<{ status: number; data: Waktu }> {
    const data = await this.knex('waktu').where({ waktuID }).first();

    if (!data) {
      throw new HttpException('Waktu not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data };
  }

  @Put(':id')
  async update(@Param('id') waktuID: string, @Body() createWaktuDto: CreateWaktuDto): Promise<{ status: number; data: Waktu }> {
    const updatedHarga = {
      ...createWaktuDto,
      updated_at: new Date(),
    };

    await this.knex('waktu')
      .where({ waktuID })
      .update(updatedHarga);

    const result = await this.knex('waktu')
      .where({ waktuID })
      .select('*');

    if (result.length === 0) {
      throw new HttpException('Waktu not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data: result[0] };
  }

  @Delete(':id')
  async remove(@Param('id') waktuID: string): Promise<{ status: number; message: string }> {
    const result = await this.knex('waktu').where({ waktuID }).del();

    if (result === 0) {
      throw new HttpException('Waktu not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, message: 'Waktu deleted successfully' };
  }
}
