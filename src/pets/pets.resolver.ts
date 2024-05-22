import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.input';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) { }

  @Mutation('createPet')
  async createPet(@Args('input') createPetInput: CreatePetDto): Promise<Pet> {
    return this.petsService.create(createPetInput);
  }

  @Query('findAll')
  async findAll(
    @Args('sortBy', { nullable: true }) sortBy: string,
    @Args('sortOrder', { nullable: true }) sortOrder: 'ASC' | 'DESC',
    @Args('search', { nullable: true }) search: string,
    @Args('filterAge', { nullable: true }) filterAge: number,
    @Args('filterSpecies', { nullable: true }) filterSpecies: string,
    @Args('skip', { defaultValue: 0 }) skip?: number,
    @Args('take', { defaultValue: 0 }) take?: number,
  ): Promise<Pet[]> {
    return this.petsService.findAll(sortBy, sortOrder, search, filterAge, filterSpecies, skip, take);
  }
}
 