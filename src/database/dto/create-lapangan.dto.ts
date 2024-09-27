import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateLapanganDto {
  @IsNotEmpty()
  @IsString()
  namaLapangan: string;

  @IsNotEmpty()
  @IsString()
  kategori: string;

  @IsNotEmpty()
  @IsString()
  gambar: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
