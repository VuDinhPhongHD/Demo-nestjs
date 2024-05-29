import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { PetOutput } from 'src/graphql';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Pet implements PetOutput {
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

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.pets)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => String, { nullable: true, description: 'Thời điểm thú cưng bị xóa mềm' })
  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: string;
}
