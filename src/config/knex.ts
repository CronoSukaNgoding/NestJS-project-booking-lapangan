import { Knex, knex } from 'knex';

export const knexConfig = {
  client: 'mysql2', 
  connection: {
    host: 'localhost',
    user: 'syahiid',
    password: '1',
    database: 'bookingLapanganNew',
  },
};

export const knexInstance: Knex = knex(knexConfig);
