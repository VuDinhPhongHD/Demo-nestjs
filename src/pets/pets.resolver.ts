import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) { }

  @Mutation(() => Pet)
  async createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
    return this.petsService.create(createPetInput);
  }

  @Query(() => [Pet], { name: 'findPetBySpecies' })
  async findOneBySpecies(@Args('species') species: string): Promise<Pet[]> {
    const pets = await this.petsService.findOneBySpecies(species);
    return pets
  }

  @Query(() => [Pet], { name: "filterPets" })
  async filterPetsByAgeAndSpecies(
    @Args('age', { nullable: true }) age: number,
    @Args('species', { nullable: true }) species: string
  ): Promise<Pet[]> {
    const pets = await this.petsService.filterPetsByAgeAndSpecies(age, species);
    return pets
  }

  @Query(() => [Pet], { name: 'pets' })
  async findAll(): Promise<Pet[]> {
    return this.petsService.findAll();
  }
}
