import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.input';
import { CreatePetInput } from 'src/graphql';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) { }

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const pet = this.petsRepository.create(createPetInput);
    return this.petsRepository.save(pet);
  }


  async findAll(
    sortBy?: string,
    sortOrder?: 'ASC' | 'DESC',
    search?: string,
    filterAge?: number,
    filterSpecies?: string,
    skip?: number,
    take?: number,
  ): Promise<Pet[]> {
    let options: FindManyOptions<Pet> = {};

    if (sortBy && sortOrder) {
      options.order = { [sortBy]: sortOrder };
    }

    if (search) {
      options.where = { name: Like(`%${search}%`) };
    }

    if (filterAge) {
      options.where = { ...options.where, age: filterAge };
    }

    if (filterSpecies) {
      options.where = { ...options.where, species: Like(`%${filterSpecies}%`) };
    }
    if (skip) {
      options.skip = skip;
    }

    if (take) {
      options.take = take;
    }
    return this.petsRepository.find(options);
  }


}
