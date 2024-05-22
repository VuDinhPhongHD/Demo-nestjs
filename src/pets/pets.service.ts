import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) { }

  async create(createPetInput: CreatePetInput): Promise<Pet> {
    const pet = new Pet();
    pet.name = createPetInput.name;
    pet.age = createPetInput.age;
    pet.species = createPetInput.species;
    return this.petsRepository.save(pet);
  }

  // async findOneBySpecies(species: string): Promise<Pet[]> {
  //   const pets = await this.petsRepository.find({
  //     where: { species: Like(`%${species}%`) }
  //   });
  //   return pets;
  // }

  // async filterPetsByAgeAndSpecies(age: number, species: string): Promise<Pet[]> {
  //   const filter: any = { age, species };
  //   if (age) {
  //     filter.age = age;
  //   }
  //   if (species) {
  //     filter.species = species;
  //   }
  //   const queryBuilder = this.petsRepository.createQueryBuilder('pet');
  //   if (filter.age) {
  //     queryBuilder.andWhere('pet.age = :age', { age: filter.age });
  //   }
  //   if (filter.species) {
  //     queryBuilder.andWhere('pet.species = :species', { species: filter.species });
  //   }
  //   return queryBuilder.getMany();
  // }
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
