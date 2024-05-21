import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePetInput {
  @Field({ description: 'Tên của thú cưng' })
  name: string;

  @Field({ description: 'Tuổi của thú cưng' })
  age: number;

  @Field({ description: 'Loài của thú cưng' })
  species: string;
}
