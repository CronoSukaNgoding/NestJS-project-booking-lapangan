import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupPembayaranService } from './group-pembayaran.service';
import { HargaService } from './harga.service';
import { HariService } from './hari.service';
import { LapanganService } from './lapangan.service';
import { TrackBalanceService } from './track-balance.service';
import { Transaction, TransactionSchema } from './schemas/transactions';
import { TransactionService } from './transactions.service';
import { User, UserSchema } from './schemas/users';
import { UserService } from './users.service';
import { WaktuService } from './waktu.service';
import { TransactionController } from '../controller/transaction.controller'; 
import { UserController } from '../controller/users.controller'; 
import { LapanganController } from '../controller/lapangan.controller'; 
import { HargaController } from '../controller/harga.controller'; 
import { GroupPembayaranController } from '../controller/group-pembayaran.controller'; 
import { HariController } from '../controller/hari.controller'; 
import { WaktuController } from '../controller/waktu.controller'; 
import { TrackBalanceController } from '../controller/track-balance.controller'; 
import { knexInstance } from '../config/knex';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sw39537:INzplyP3yr60kFDX@cluster0.3c57q.mongodb.net/'), 
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: User.name, schema: UserSchema },
    ]),
    DatabaseModule,
  ],
  controllers: [
    TransactionController,
    UserController,
    LapanganController,
    HargaController,
    GroupPembayaranController,
    WaktuController,
    HariController,
    TrackBalanceController
  ],
  providers: [
    {
      provide: 'KnexConnection',
      useValue: knexInstance,
    },
    GroupPembayaranService, 
    HargaService, 
    HariService, 
    LapanganService,
    TrackBalanceService,
    TransactionService,
    UserService,
    WaktuService,
  ],
  exports: [
    'KnexConnection',
    GroupPembayaranService, 
    HargaService, 
    HariService, 
    LapanganService,
    TrackBalanceService,
    TransactionService,
    UserService,
    WaktuService,
  ], 
})
export class DatabaseModule {}
