import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  // Enables us to use @InjectRepository in service
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
