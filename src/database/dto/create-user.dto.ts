import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;  

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()  
  role_id: number;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;  

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()  
  role_id: number;
}

export class UpdatePasswordUserDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string; 

  @IsNotEmpty()
  @IsString()
  newPassword: string; 

  @IsNotEmpty()
  @IsString()
  confirmPassword: string; 
}
