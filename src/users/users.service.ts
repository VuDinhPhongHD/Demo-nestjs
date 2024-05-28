
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from 'src/graphql';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    async createUser(createUserInput: CreateUserInput) {
        try {
            console.log("createUserInput", createUserInput)
            const user = this.usersRepository.create(createUserInput);
            const result = await this.usersRepository.save(user);
            if (result) {
                return result;
            } else {
                throw new Error('Failed to create user.');
            }
        } catch (error) {
            console.error('Error while creating user:', error);
            throw new Error('Failed to create user.');
        }
    }
}
