import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [EventsResolver, EventsService],
  imports: [TypeOrmModule.forFeature([Event]), UsersModule],
})
export class EventsModule {}
