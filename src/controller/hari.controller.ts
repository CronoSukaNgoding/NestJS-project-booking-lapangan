import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateHariDto } from '../database/dto/create-hari.dto';
import { Knex } from 'knex';
import { Hari } from '../database/models/hari';
import { v4 as uuidv4 } from 'uuid';

@Controller('/hari')
export class HariController {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  @Post()
  async create(@Body() createHariDto: CreateHariDto): Promise<{ status: number; data: Hari }> {
    const { nama } = createHariDto;
    const newHari = {
      nama,
    };

    const [insertedId] = await this.knex('hari').insert(newHari);

    const [data] = await this.knex('hari').where({ hariID: insertedId }).select('*');
    

    return { status: HttpStatus.OK, data }; 
  }

  @Get()
  async findAll(): Promise<{ status: number; data: Hari[] }> {
    const data = await this.knex('hari').select('*');
    return { status: HttpStatus.OK, data };
  }

  @Get(':id')
  async findOne(@Param('id') hariID: string): Promise<{ status: number; data: Hari }> {
    const data = await this.knex('hari').where({ hariID }).first();

    if (!data) {
      throw new HttpException('Hari not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data };
  }

  @Put(':id')
  async update(@Param('id') hariID: string, @Body() createHariDto: CreateHariDto): Promise<{ status: number; data: Hari }> {
    const updatedHarga = {
      ...createHariDto,
    };

    await this.knex('hari')
      .where({ hariID })
      .update(updatedHarga);

    const result = await this.knex('hari')
      .where({ hariID })
      .select('*');

    if (result.length === 0) {
      throw new HttpException('Hari not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data: result[0] };
  }

  @Delete(':id')
  async remove(@Param('id') hariID: string): Promise<{ status: number; message: string }> {
    const result = await this.knex('hari').where({ hariID }).del();

    if (result === 0) {
      throw new HttpException('Hari not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, message: 'Hari deleted successfully' };
  }
}
