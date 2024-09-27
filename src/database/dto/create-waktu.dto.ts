import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWaktuDto {
  @IsNotEmpty()
  @IsString()
  pukul: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  status: number;

}
