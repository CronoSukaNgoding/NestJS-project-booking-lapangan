import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGroupPembayaranDto {
  @IsNotEmpty()
  @IsString()
  namaPembayaran: string;

  gambar: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @Type(() => Number)
  norek: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  statusPay: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  status: number;

}
