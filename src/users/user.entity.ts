import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { UserOutput } from 'src/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class User implements UserOutput {
  @Field(() => ID, { description: 'ID của người dùng' })
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Field(() => Int, { description: 'Tuổi của người dùng' })
  @Column()
  age: number;

  @Field(() => String, { description: 'Tên của người dùng' })
  @Column()
  name: string;

  @Field(() => String, { description: 'Email người dùng' })
  @Column()
  email: string;
}
