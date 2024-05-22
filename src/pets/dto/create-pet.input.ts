// import { InputType, Field } from '@nestjs/graphql';

// @InputType()
// export class CreatePetInput {
//   @Field({ description: 'Tên của thú cưng' })
//   name: string;

//   @Field({ description: 'Tuổi của thú cưng' })
//   age: number;

//   @Field({ description: 'Loài của thú cưng' })
//   species: string; 
// }
import { PetInput } from '../../graphql'

export class CreatePetDto implements PetInput {
  id: string
  age?: number
  name?: string
  species?: string
}