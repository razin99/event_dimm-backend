import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    // instantiate User with fields from CreateUserInput
    const newUser = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newUser); // INSERT INTO
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find(); // SELECT * FROM table
  }

  async findOne(id: string) {
    // return this.usersRepository.findOneOrFail(id); // an alternative
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
