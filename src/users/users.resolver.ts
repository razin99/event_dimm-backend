import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, {
    description: 'create new user and return it back',
  })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], {
    name: 'users',
    description: 'get all users from database',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, {
    name: 'user',
    description: 'get one user with given id',
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => String)
  async login(
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<string> {
    const user: User = await this.usersService.login({ username, password });
    return user.id || '';
  }

  @Mutation(() => User, {
    description:
      'if password or username is left blank, it would not be updated',
  })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  @Mutation(() => Boolean, {
    description: 'Return true on success, false on failure',
  })
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
