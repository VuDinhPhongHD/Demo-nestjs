import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput, FindPetInput, PetOutput, UserOutput } from 'src/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
// import { CreatePetDto } from './dto/create-pet.input';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Mutation('createUser')
    async createPet(@Args('input') createUserInput: CreateUserInput) {
        return this.usersService.createUser(createUserInput);
    }

    // @Query('findAll')
    // async findAll(@Args('input') input: FindPetInput) {
    //     return this.petsService.findAll(input);
    // }
}
