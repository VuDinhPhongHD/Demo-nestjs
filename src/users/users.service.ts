
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput, UpdateUserInput, UserOutput } from 'src/graphql';

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
            return result;
        } catch (error) {
            console.error('Error while creating user:', error);
            throw new Error('Failed to create user.');
        }
    }

    async updateUser(updateUserInput: UpdateUserInput) {
        try {
            const user = await this.usersRepository.findOne({ where: { id: updateUserInput.id } });
            if (!user) throw new Error("user doesn't exits.");
            Object.assign(user, updateUserInput);
            const updatedUser = await this.usersRepository.save(user);
            return updatedUser;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }


    async deletePet(userId: string) {
        try {
            const user = await this.usersRepository.findOne({ where: { id: userId } });
            if (!user) throw new NotFoundException('User not found');
            user.deletedAt = new Date().toISOString();
            return await this.usersRepository.save(user);
        } catch (error) {
            throw new Error(`Failed to soft delete user: ${error.message}`);
        }
    }

    async destroyUser(userId: string) {
        try {
            const user = await this.usersRepository.findOne({ where: { id: userId } });
            if (!user) throw new NotFoundException('user not found');
            await this.usersRepository.delete(userId);
            return user;
        } catch (error) {
            throw new Error(`Failed to hard delete user: ${error.message}`);
        }
    }

    async findOne(email: string) {
        try {
            const user = await this.usersRepository.findOne({ where: { email: email } });
            return user;
        } catch (error) {
            throw new Error(`Failed to hard find user: ${error.message}`);
        }
    }
}
