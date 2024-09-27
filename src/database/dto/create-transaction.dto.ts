import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsInt() 
  checkoutID: number;

  @IsNotEmpty()
  @IsString()
  transactionID: string;

  @IsNotEmpty()
  @IsString()
  userID: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  payMethod: string;

  @IsNotEmpty()
  @IsString()
  waktuID: string;


}
