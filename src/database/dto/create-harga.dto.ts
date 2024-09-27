import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHargaDto {
  @IsNotEmpty()
  @IsString()
  lapangan_id: string;

  @IsNotEmpty()
  @IsString()
  waktuID: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  hariID: number;

  @IsNotEmpty()
  @IsString()
  harga: string;
}
