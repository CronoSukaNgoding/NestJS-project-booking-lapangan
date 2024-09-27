import { Injectable, Inject,BadRequestException, NotFoundException  } from '@nestjs/common';
import { Knex } from 'knex';
import { GroupPembayaran } from './models/group-pembayaran';


@Injectable()
export class GroupPembayaranService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}


  async create(groupData: any): Promise<GroupPembayaran> {
    const [id] = await this.knex('group_pembayaran').insert(groupData); 
    return this.findOne(id); 
  }


  async findAll(): Promise<GroupPembayaran[]> {
    return this.knex('group_pembayaran').select('*'); 
  }


  async findOne(id: number): Promise<GroupPembayaran> {
    return this.knex('group_pembayaran').where({ id }).first();
  }

  

}
