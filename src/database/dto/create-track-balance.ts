import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateTrackBalanceDto {
  @IsNotEmpty()
  @IsString()
  transactionID: string;

  @IsNotEmpty()
  @IsString()
  totalHarga: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  bukti:string;


}
