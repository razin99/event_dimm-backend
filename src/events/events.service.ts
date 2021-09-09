import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
    private usersService: UsersService,
  ) {}

  create(createEventInput: CreateEventInput): Promise<Event> {
    const newEvent = this.eventsRepository.create(createEventInput);
    return this.eventsRepository.save(newEvent);
  }

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  findOne(id: string): Promise<Event> {
    return this.eventsRepository.findOne(id);
  }

  async update(updateEventInput: UpdateEventInput): Promise<Event> {
    const preUpdateEvent: Event = await this.findOne(updateEventInput.id);
    return this.eventsRepository.save({
      ...preUpdateEvent,
      ...updateEventInput,
    });
  }

  async remove(id: string): Promise<boolean> {
    return (await this.eventsRepository.delete(id)).affected === 1;
  }

  async getOrganizer(id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
}
