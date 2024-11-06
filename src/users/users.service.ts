import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {


    constructor (@InjectRepository(User) private readonly userRepository: Repository<User>,
  ){}

    async findOne(username: string): Promise<User | undefined> {
        return this.userRepository.findOneBy({username});
      }

    async create(userDto: UserDto){

      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      const user = this.userRepository.create({username: userDto.username, password: hashedPassword});

      return await this.userRepository.save(user);
    }
}
