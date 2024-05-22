import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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

  async findOneBySpecies(species: string): Promise<Pet[]> {
    const pets = await this.petsRepository.find({
      where: { species: Like(`%${species}%`) }
    });
    return pets;
  }

  async filterPetsByAgeAndSpecies(age: number, species: string): Promise<Pet[]> {
    const filter: any = { age, species };
    if (age) {
      filter.age = age;
    }
    if (species) {
      filter.species = species;
    }
    const queryBuilder = this.petsRepository.createQueryBuilder('pet');
    if (filter.age) {
      queryBuilder.andWhere('pet.age = :age', { age: filter.age });
    }
    if (filter.species) {
      queryBuilder.andWhere('pet.species = :species', { species: filter.species });
    }
    return queryBuilder.getMany();
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }
}
