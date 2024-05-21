import { Injectable } from '@nestjs/common';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) { }

  async create(createPetInput: CreatePetInput): Promise<Pet> {
    console.log("createPetInput",createPetInput)
    const pet = new Pet();
    pet.name = createPetInput.name;
    pet.age = createPetInput.age;
    pet.species = createPetInput.species;
    return this.petsRepository.save(pet);
  }

  async findAll(): Promise<Pet[]> {
    return await this.petsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetInput: UpdatePetInput) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
