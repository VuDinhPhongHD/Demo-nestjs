import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { FindPetInput, PetOutput } from 'src/graphql';
// import { CreatePetDto } from './dto/create-pet.input';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) { }

  @Mutation('createPet')
  async createPet(@Args('input') createPetInput: PetOutput) {
    return this.petsService.createPet(createPetInput);
  }

  @Query('findAll')
  async findAll(@Args('input') input: FindPetInput){
    return this.petsService.findAll(input);
  }
}
 