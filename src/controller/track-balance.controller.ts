import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateTrackBalanceDto } from '../database/dto/create-track-balance';
import { Knex } from 'knex';
import { TrackBalance } from '../database/models/track-balance';
import { v4 as uuidv4 } from 'uuid';

@Controller('/track-balance')
export class TrackBalanceController {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  @Post()
  async create(@Body() createTrackBalanceDto: CreateTrackBalanceDto): Promise<{ status: number; data: TrackBalance }> {
    const { transactionID, totalHarga, status, bukti } = createTrackBalanceDto;
    const trackID = uuidv4();

    const newTrack = {
      trackID,
      transactionID,
      totalHarga,
      status,
      bukti,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const [insertedId] = await this.knex('trackBalance').insert(newTrack);

    const [data] = await this.knex('trackBalance').where({ trackID: insertedId }).select('*');
    

    return { status: HttpStatus.OK, data }; 
  }

  @Get()
  async findAll(): Promise<{ status: number; data: TrackBalance[] }> {
    const data = await this.knex('trackBalance').select('*');
    return { status: HttpStatus.OK, data };
  }

  @Get(':id')
  async findOne(@Param('id') trackID: string): Promise<{ status: number; data: TrackBalance }> {
    const data = await this.knex('trackBalance').where({ trackID }).first();

    if (!data) {
      throw new HttpException('TrackBalance not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data };
  }

  @Put(':id')
  async update(@Param('id') trackID: string, @Body() createTrackBalanceDto: CreateTrackBalanceDto): Promise<{ status: number; data: TrackBalance }> {
    const updatedHarga = {
      ...createTrackBalanceDto,
      updated_at: new Date(),
    };

    await this.knex('trackBalance')
      .where({ trackID })
      .update(updatedHarga);

    const result = await this.knex('trackBalance')
      .where({ trackID })
      .select('*');

    if (result.length === 0) {
      throw new HttpException('TrackBalance not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data: result[0] };
  }

  @Delete(':id')
  async remove(@Param('id') trackID: string): Promise<{ status: number; message: string }> {
    const result = await this.knex('trackBalance').where({ trackID }).del();

    if (result === 0) {
      throw new HttpException('TrackBalance not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, message: 'TrackBalance deleted successfully' };
  }
}
