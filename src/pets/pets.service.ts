import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) {}

  async create(createPetInput: CreatePetInput): Promise<Pet> {
    const pet = new Pet();
    pet.name = createPetInput.name;
    pet.age = createPetInput.age;
    pet.species = createPetInput.species;
    return this.petsRepository.save(pet);
  }

  async findOneByName(species: string): Promise<Pet> {
    return this.petsRepository.findOneBy({ species: species });
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }
}
