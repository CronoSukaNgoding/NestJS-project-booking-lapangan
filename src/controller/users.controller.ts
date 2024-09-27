import { Controller, Get, Post, Body, Param, Put, Delete, Header, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../database/users.service';
import { User } from '../database/schemas/users';
import { CreateUserDto,UpdateUserDto, UpdatePasswordUserDto } from '../database/dto/create-user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Header('content-type', 'application/json')
  async create(@Body() createUserDto: CreateUserDto): Promise<{ status: number; result: User }> {
    const result = await this.userService.create(createUserDto);

    if (!result) {
      throw new HttpException('Something error, user not created', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, result }; 
  }

  @Get()
  async findAll(): Promise<{ status: number; data: User[] }> {
    const data = await this.userService.findAll();
    
    if (!data || data.length === 0) {
      throw new HttpException('No data found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data  }; 
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ status: number; data: User }> {
    const data = await this.userService.findOne(id);
    
    if (!data) { 
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data }; 
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<{ status?:number; data?: User }> {
    const data = await this.userService.update(id, updateUserDto);
    if (data.error) {
      throw new HttpException({ status:HttpStatus.BAD_REQUEST, error: data.error }, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  @Put('/update-password/:id')
  @Header('content-type', 'application/json')
  async updatePassword(@Param('id') id: string, @Body() updateUserDto: UpdatePasswordUserDto): Promise<{ status?:number; data?: User; }> {
    const data = await this.userService.updatePassword(id, updateUserDto);
    
    if (data.error) {
      throw new HttpException({ status:400, error: data.error }, HttpStatus.BAD_REQUEST);
    }
    
    return data;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ status?:number; user?: User; }> {
    const data = await this.userService.remove(id);

    if (data.error) {
      throw new HttpException({ status:400, error: data.error }, HttpStatus.BAD_REQUEST);
    }
    
    return data;
  }
}
