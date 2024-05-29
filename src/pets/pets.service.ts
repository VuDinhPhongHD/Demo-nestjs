import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetInput, FindPetInput, PetOutput, UpdatePetInput } from 'src/graphql';
import { User } from 'src/users/user.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async createPet(createPetInput: CreatePetInput) {
    try {
      const pet = this.petsRepository.create(createPetInput);
      const result = await this.petsRepository.save(pet);
      if (result) {
        return result;
      } else {
        throw new Error('Failed to create pet.');
      }
    } catch (error) {
      console.error('Error while creating pet:', error);
      throw new Error('Failed to create pet.');
    }
  }

  async queryPetById(id: string) {
    const pet = await this.petsRepository.findOne({ where: { id }, relations: ['user'] });
    //(relations: ['user'] ) TypeORM được thông báo rằng muốn lấy thông tin về người dùng kèm theo thông tin của thú cưng
    if (!pet) throw new Error("Pet doesn't exist.");
    return pet;
  }

  async findAll(findPetInput: FindPetInput): Promise<PetOutput[]> {
    try {
      let options: FindManyOptions<Pet> = {};

      if (findPetInput?.sortBy && findPetInput?.sortOrder) {
        options.order = { [findPetInput.sortBy]: findPetInput.sortOrder };
      }

      if (findPetInput?.search) {
        options.where = { name: Like(`%${findPetInput.search}%`) };
      }

      if (findPetInput?.filterAge) {
        options.where = { ...options.where, age: findPetInput.filterAge };
      }

      if (findPetInput?.filterSpecies) {
        options.where = { ...options.where, species: Like(`%${findPetInput.filterSpecies}%`) };
      }
      if (findPetInput?.skip) {
        options.skip = findPetInput.skip;
      }

      if (findPetInput?.take) {
        options.take = findPetInput.take;
      }

      const pets = await this.petsRepository.find(options);
      if (pets.length == 0) {
        throw new Error('Failed to find pets.');
      }
      return pets;
    } catch (error) {
      console.error('Error while finding pets:', error);
      throw new Error('Failed to find pets.');
    }
  }

  async updatePet(updatePetInput: UpdatePetInput) {
    try {
      const pet = await this.petsRepository.findOne({ where: { id: updatePetInput.id } });
      if (!pet) throw new Error("Pet doesn't exits.");
      Object.assign(pet, updatePetInput);
      const updatedPet = await this.petsRepository.save(pet);
      return updatedPet;
    } catch (error) {
      throw new Error(`Failed to update pet: ${error.message}`);
    }
  }

  async deletePet(petId: string) {
    try {
      const pet = await this.petsRepository.findOne({ where: { id: petId } });
      if (!pet) throw new NotFoundException('Pet not found');
      pet.deletedAt = new Date().toISOString();
      return await this.petsRepository.save(pet);
    } catch (error) {
      throw new Error(`Failed to soft delete pet: ${error.message}`);
    }
  }

  async destroyPet(petId: string) {
    try {
      const pet = await this.petsRepository.findOne({ where: { id: petId } });
      if (!pet) {
        throw new NotFoundException('Pet not found');
      }
      await this.petsRepository.delete(petId);
      return pet;
    } catch (error) {
      throw new Error(`Failed to hard delete pet: ${error.message}`);
    }
  }

}
