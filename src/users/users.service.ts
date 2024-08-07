import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { In, Repository } from 'typeorm';
import { CreateUserInput, UpdateUserInput, UserOutput } from 'src/graphql';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async getUsersByBatch(userIds: string[]): Promise<User[]> {
    const users = await this.usersRepository.find({
      where: { id: In(userIds) },
    });
    const results = users.filter((user) => userIds.includes(user.id));
    const mappedResults = userIds.map((id) =>
      results.find((result) => result.id === id),
    );
    return mappedResults;
  }

  hashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async isValidPassword(password, hash) {
    const result = compareSync(password, hash);
    return result;
  }

  async createUser(createUserInput: CreateUserInput) {
    try {
      createUserInput.password = await this.hashPassword(
        createUserInput.password,
      );
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
      const user = await this.usersRepository.findOne({
        where: { id: updateUserInput.id },
      });
      if (!user) throw new Error("user doesn't exits.");
      Object.assign(user, updateUserInput);
      const updatedUser = await this.usersRepository.save(user);
      return updatedUser;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async deleteUser(userId: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) throw new NotFoundException('User not found');
      user.deletedAt = new Date().toISOString();
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new Error(`Failed to soft delete user: ${error.message}`);
    }
  }

  async destroyUser(userId: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) throw new NotFoundException('user not found');
      await this.usersRepository.delete(userId);
      return user;
    } catch (error) {
      throw new Error(`Failed to hard delete user: ${error.message}`);
    }
  }
  async updateUserRefreshToken(refresh_token: string, id: string) {
    try {
      return await this.usersRepository.update(id, { refresh_token });
    } catch (error) {
      throw new Error(`Failed to update refresh_token user: ${error.message}`);
    }
  }
  async findOne(email: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: email },
      });
      return user;
    } catch (error) {
      throw new Error(`Failed to hard find user: ${error.message}`);
    }
  }
  async findOneByRefreshToken(refresh_token: string) {
    return this.usersRepository.findOne({
      where: { refresh_token: refresh_token },
    });
  }

  async listUser(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }
}
