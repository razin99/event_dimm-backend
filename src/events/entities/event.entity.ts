import { ObjectType, Field, GraphQLTimestamp } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  // Many event can be organized by 1 user
  @ManyToOne(() => User, (user) => user.organizing)
  @Field(() => User)
  organizer: User;
}
