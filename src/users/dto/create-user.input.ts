import { InputType, Field } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Length(5, 100)
  @Field(() => String)
  username: string;

  @Length(10, 150)
  @Field(() => String)
  password: string;

  @Length(3, 100)
  @Field(() => String)
  first_name: string;

  @Length(3, 100)
  @Field(() => String)
  last_name: string;
}
