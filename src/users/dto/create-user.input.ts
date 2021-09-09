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
}
