import { ObjectType, Field, GraphQLTimestamp, Float } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column({ type: 'timestamp' })
  @Field(() => GraphQLTimestamp)
  date: Date;

  @Column()
  @Field(() => String)
  location: string;

  @Column()
  @Field(() => Float)
  fee: number;

  // Many event can be organized by 1 user
  @ManyToOne(() => User, (user) => user.organizing)
  @Field(() => User)
  organizer: User;

  @Column()
  organizerId: string;

  @ManyToMany(() => Event, { nullable: true, cascade: true })
  @Field(() => [User], { nullable: true })
  attendees: User[];
}
