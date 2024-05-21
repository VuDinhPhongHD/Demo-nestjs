import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Pet {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

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
