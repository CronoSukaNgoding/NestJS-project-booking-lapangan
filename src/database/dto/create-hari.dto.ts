import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHariDto {
  @IsNotEmpty()
  @IsString()
  nama: string;
}
