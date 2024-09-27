import { Controller, Get, Post, Body, Param, Put, Delete, Header, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionService } from '../database/transactions.service';
import { Transaction } from '../database/schemas/transactions';
import { CreateTransactionDto } from '../database/dto/create-transaction.dto';

@Controller('/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @Header('content-type', 'application/json')
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<{ status: number; result: Transaction }> {
    const result = await this.transactionService.create(createTransactionDto);
    if (!result) {
      throw new HttpException('Something went wrong, transaction not created', HttpStatus.NOT_FOUND);
    }

    return { status: 200, result }; 
  }

  @Get()
  async findAll(): Promise<{ status: number; data: Transaction[] }> {
    const data = await this.transactionService.findAll();
    return { status: 200, data }; 
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ status: number; data: Transaction }> {
    const data = await this.transactionService.findOne(id);

    if (!data) { 
      throw new HttpException('No transaction found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data }; 
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  async update(@Param('id') id: string, @Body() updateTransactionDto: CreateTransactionDto): Promise<{ status: number; data?: Transaction }> {
    const data = await this.transactionService.update(id, updateTransactionDto);
    if (data.error) {
      throw new HttpException({ status: 400, error: data.error }, HttpStatus.BAD_REQUEST);
    }
    
    return data;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ status: number; data?: Transaction }> {
    const data = await this.transactionService.remove(id);

    if (data.error) {
      throw new HttpException({ status: 400, error: data.error }, HttpStatus.BAD_REQUEST);
    }
    
    return data;
  }
}
