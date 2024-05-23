import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetInput, FindPetInput, PetOutput } from 'src/graphql';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
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
      if(pets.length == 0){
        throw new Error('Failed to find pets.');
      }
      return pets;
    } catch (error) {
      console.error('Error while finding pets:', error); // Ghi log lỗi
      throw new Error('Failed to find pets.'); // Ném lại ngoại lệ
    }
  }



}
