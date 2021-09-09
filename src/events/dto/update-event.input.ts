import { CreateEventInput } from './create-event.input';
import {
  InputType,
  Field,
  PartialType,
  GraphQLTimestamp,
  Float,
} from '@nestjs/graphql';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title?: string;

  @Field(() => GraphQLTimestamp)
  date?: Date;

  @Field(() => String)
  location?: string;

  @Field(() => Float)
  fee?: number;
}
