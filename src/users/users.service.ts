import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, getConnection, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

// TODO handle errors in a more graceful way
// TODO hash password on create

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const count = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('username = :username', { username: createUserInput.username })
      .getCount();
    if (count === 0) {
      // instantiate User with fields from CreateUserInput
      const newUser = this.usersRepository.create(createUserInput);
      return this.usersRepository.save(newUser); // INSERT INTO
    }
  }

  async findAll(options: FindOneOptions<User> = {}): Promise<User[]> {
    return this.usersRepository.find(options); // SELECT * FROM table
  }

  async findOne(id: string, options: FindOneOptions<User> = {}): Promise<User> {
    return this.usersRepository.findOne(id, options);
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const preUpdateUser: User = await this.findOne(updateUserInput.id);
    return this.usersRepository.save({
      ...preUpdateUser,
      ...updateUserInput,
    });
  }

  async userSave(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<boolean> {
    return (await this.usersRepository.delete(id)).affected === 1;
  }
}
