import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) {}

  @Mutation(() => Pet)
  async createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
    return this.petsService.create(createPetInput);
  }

  @Query(() => Pet, { name: 'findPetBySpecies' })
  async findOneByName(@Args('species') species: string): Promise<Pet> {
    return this.petsService.findOneByName(species);
  }

  @Query(() => [Pet], { name: 'pets' })
  async findAll(): Promise<Pet[]> {
    return this.petsService.findAll();
  }
}
