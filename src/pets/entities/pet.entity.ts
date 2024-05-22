import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { PetInput } from 'src/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Pet implements PetInput {
  @Field(() => ID, { description: 'ID của thú cưng' })
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Field(() => Int, { description: 'Tuổi của thú cưng' })
  @Column()
  age: number;

  @Field(() => String, { description: 'Tên của thú cưng' })
  @Column()
  name: string;

  @Field(() => String, { description: 'Loài của thú cưng' })
  @Column()
  species: string;
}
