import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateGroupPembayaranDto } from '../database/dto/create-group-pembayaran.dto';
import { Knex } from 'knex';
import { GroupPembayaran } from '../database/models/group-pembayaran';
import { v4 as uuidv4 } from 'uuid';

@Controller('/group-pembayaran')
export class GroupPembayaranController {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  @Post()
  async create(@Body() createGroupPembayaranDto: CreateGroupPembayaranDto): Promise<{ status: number; data: GroupPembayaran }> {
    const { namaPembayaran, norek, gambar, logo, statusPay, status } = createGroupPembayaranDto;
    const pembayaranID = uuidv4();

    const newHarga = {
      pembayaranID,
      namaPembayaran,
      norek,
      gambar,
      logo,
      statusPay, 
      status,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const [insertedId] = await this.knex('groupPembayaran').insert(newHarga);

    const [data] = await this.knex('groupPembayaran').where({ pembayaranID: insertedId }).select('*');
    

    return { status: HttpStatus.OK, data }; 
  }

  @Get()
  async findAll(): Promise<{ status: number; data: GroupPembayaran[] }> {
    const data = await this.knex('groupPembayaran').select('*');
    return { status: HttpStatus.OK, data };
  }

  @Get(':id')
  async findOne(@Param('id') pembayaranID: string): Promise<{ status: number; data: GroupPembayaran }> {
    const data = await this.knex('groupPembayaran').where({ pembayaranID }).first();

    if (!data) {
      throw new HttpException('GroupPembayaran not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data };
  }

  @Put(':id')
  async update(@Param('id') pembayaranID: string, @Body() createGroupPembayaranDto: CreateGroupPembayaranDto): Promise<{ status: number; data: GroupPembayaran }> {
    const updatedHarga = {
      ...createGroupPembayaranDto,
      updated_at: new Date(),
    };

    await this.knex('groupPembayaran')
      .where({ pembayaranID })
      .update(updatedHarga);

    const result = await this.knex('groupPembayaran')
      .where({ pembayaranID })
      .select('*');

    if (result.length === 0) {
      throw new HttpException('GroupPembayaran not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data: result[0] };
  }

  @Delete(':id')
  async remove(@Param('id') pembayaranID: string): Promise<{ status: number; message: string }> {
    const result = await this.knex('groupPembayaran').where({ pembayaranID }).del();

    if (result === 0) {
      throw new HttpException('GroupPembayaran not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, message: 'GroupPembayaran deleted successfully' };
  }
}
