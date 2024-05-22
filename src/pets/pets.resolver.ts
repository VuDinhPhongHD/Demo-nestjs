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

  // @Query(() => [Pet], { name: 'findPetBySpecies' })
  // async findOneBySpecies(@Args('species') species: string): Promise<Pet[]> {
  //   const pets = await this.petsService.findOneBySpecies(species);
  //   return pets
  // }

  // @Query(() => [Pet], { name: "filterPets" })
  // async filterPetsByAgeAndSpecies(
  //   @Args('age', { nullable: true }) age: number,
  //   @Args('species', { nullable: true }) species: string
  // ): Promise<Pet[]> {
  //   const pets = await this.petsService.filterPetsByAgeAndSpecies(age, species);
  //   return pets
  // }

  // Phương thức findAll với các tham số sắp xếp
  @Query(() => [Pet], { name: 'pets' })
  async findAll(
    @Args('sortBy', { nullable: true }) sortBy: string,
    @Args('sortOrder', { nullable: true }) sortOrder: 'ASC' | 'DESC',
    @Args('search', { nullable: true }) search: string,
    @Args('filterAge', { nullable: true }) filterAge: number,
    @Args('filterSpecies', { nullable: true }) filterSpecies: string,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ): Promise<Pet[]> {
    return this.petsService.findAll(sortBy, sortOrder, search, filterAge, filterSpecies, skip, take);
  }
}
