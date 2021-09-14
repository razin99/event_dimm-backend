import { Field, Float, GraphQLTimestamp, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => GraphQLTimestamp)
  date: Date;

  @Field(() => String)
  location: string;

  @Field(() => Float)
  fee: number;

  @Field(() => String, { description: 'user id of organizer' })
  organizerId: string;
}
