import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getConnection, Repository, UpdateResult } from 'typeorm';
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

  async findOne(id: string): Promise<User> {
    // return this.usersRepository.findOneOrFail(id); // an alternative
    return this.usersRepository.findOne(id);
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const conn = await getConnection();
    const { id, username, password } = updateUserInput;
    let setStmt = {};
    if (username && password) {
      setStmt = { username, password };
    } else if (username) {
      setStmt = { username };
    } else if (password) {
      setStmt = { password };
    }
    conn
      .createQueryBuilder()
      .update(User)
      .set(setStmt)
      .where('id = :id', { id })
      .execute();
    return this.findOne(id);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
