import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.create(createEventInput);
  }

  @Query(() => [Event], { name: 'events' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Query(() => Event, { name: 'event' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.eventsService.findOne(id);
  }

  @Mutation(() => Event)
  updateEvent(@Args('updateEventInput') updateEventInput: UpdateEventInput) {
    return this.eventsService.update(updateEventInput);
  }

  @Mutation(() => Boolean)
  removeEvent(@Args('id', { type: () => String }) id: string) {
    return this.eventsService.remove(id);
  }

  @ResolveField(() => User)
  organizer(@Parent() event: Event): Promise<User> {
    return this.eventsService.getOrganizer(event.organizerId);
  }

  @ResolveField(() => [User])
  attendees(@Parent() event: Event): Promise<User[]> {
    return this.eventsService.getAttendees(event.id);
  }

  @Mutation(() => Event)
  attend(
    @Args('id', { type: () => String }) id: string,
    @Args('userId', { type: () => String }) userId: string,
  ) {
    return this.eventsService.attend(id, userId);
  }

  @Mutation(() => Event)
  unattend(
    @Args('id', { type: () => String }) id: string,
    @Args('userId', { type: () => String }) userId: string,
  ) {
    return this.eventsService.unattend(id, userId);
  }
}
