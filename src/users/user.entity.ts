import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { UserOutput } from 'src/graphql';
import { Pet } from 'src/pets/entities/pet.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
@ObjectType()
export class User implements UserOutput {
  @Field(() => ID, { description: 'ID của người dùng' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'password của người dùng' })
  @Column({ nullable: true })
  password: string;


  @Field(() => Int, { description: 'Tuổi của người dùng' })
  @Column()
  age: number;

  @Field(() => String, { description: 'Tên của người dùng' })
  @Column()
  name: string;

  @Field(() => String, { description: 'Email người dùng' })
  @Column()
  email: string;

  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];

  @Field(() => String, { description: 'refresh_token người dùng' })
  @Column({ nullable: true })
  refresh_token?: string;

  @Field(() => String, { nullable: true, description: 'Thời điểm người dùng bị xóa mềm' })
  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: string;
}
