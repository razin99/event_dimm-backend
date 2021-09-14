import { ObjectType, Field } from '@nestjs/graphql';
import { Event } from 'src/events/entities/event.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  username: string;

  @Column()
  @Field(() => String)
  first_name: string;

  @Column()
  @Field(() => String)
  last_name: string;

  @Column()
  @Field(() => String)
  password: string;

  // One user can organize many event
  @OneToMany(() => Event, (event) => event.organizer)
  @Field(() => [Event], { nullable: true })
  organizing: Event[];

  // Many user can attend many event
  @ManyToMany(() => Event, { nullable: true, cascade: true })
  @JoinTable()
  @Field(() => [Event], { nullable: true })
  attending: Event[];
}
