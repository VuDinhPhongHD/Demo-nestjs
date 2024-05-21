import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePetInput {
  @Field({ nullable: true, description: 'Tên của thú cưng' })
  name?: string;

  @Field({ nullable: true, description: 'Tuổi của thú cưng' })
  age?: number;

  @Field({ nullable: true, description: 'Loài của thú cưng' })
  species?: string;

  @Field({ description: 'Id của thú cưng' })
  id: string;
}
