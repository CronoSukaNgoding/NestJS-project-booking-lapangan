import { Injectable, BadRequestException, NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types  } from 'mongoose';
import { User, UserDocument } from './schemas/users';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto,UpdatePasswordUserDto } from '../database/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: Partial<User>): Promise<User> {
    console.log("Received userData:", userData);
    const saltRounds = 10; // Tentukan jumlah salt rounds
    

    const hashedPassword = userData.password
      ? await bcrypt.hash(userData.password, saltRounds)
      : null;

    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword, 
      userID: uuidv4(), 
      created_at: new Date(),
      updated_at: new Date(),
    });
  
    return await newUser.save(); 
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<{ status? : number; user?: User; error?: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { status:200, user };
  }

  async updatePassword(id: string, userData: Partial<UpdatePasswordUserDto>): Promise<{ status?:number; user?: User; error?: string }> {
    try {
      if (userData.confirmPassword !== userData.newPassword) {
        return { error: 'New password and confirm password do not match.' };
      }

      const user = await this.userModel.findById(id).exec();
      if (!user) {
        return { error: 'User not found.' };
      }

      const isOldPasswordValid = await bcrypt.compare(userData.oldPassword, user.password);

      if (!isOldPasswordValid) {
        return { error: 'Old password is incorrect.' };
      }

      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(userData.newPassword, saltRounds);
      
      user.password = hashedNewPassword; 
      await user.save(); 

      return { status:200, user };
    } catch (error) {
      return { status: 400, error: error.message };
    }
  }

  async remove(id: string): Promise<{ status?: number; user?: User; error?: string }> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ID format');
      }

      const user = await this.userModel.findByIdAndDelete(id).exec();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return { status: 200, user };
    } catch (error) {
      return { status: 400, error: error.message };
    }
  }
}
