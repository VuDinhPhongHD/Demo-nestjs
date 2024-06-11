import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { FindPetInput, PetOutput, UpdatePetInput } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { CreatePetDto } from './dto/create-pet.input';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation('createPet')
  async createPet(@Args('input') createPetInput: PetOutput) {
    return this.petsService.createPet(createPetInput);
  }

  @Query('findAll')
  async findAll(@Args('input') input: FindPetInput) {
    return this.petsService.findAll(input);
  }

  @Query('queryPetById')
  async queryPetById(@Args('petId') petId: string) {
    return this.petsService.queryPetById(petId);
  }

  @Mutation('updatePet')
  async updatePet(@Args('input') input: UpdatePetInput) {
    return this.petsService.updatePet(input);
  }

  @Mutation('deletePet')
  async deletePet(@Args('petId') petId: string) {
    return this.petsService.deletePet(petId);
  }

  @Mutation('destroyPet')
  async destroyPet(@Args('petId') petId: string) {
    return this.petsService.destroyPet(petId);
  }
}
