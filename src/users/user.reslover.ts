import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput, FindPetInput, PetOutput, UpdateUserInput, UserOutput } from 'src/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
// import { CreatePetDto } from './dto/create-pet.input';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Mutation('createUser')
    async createUser(@Args('input') createUserInput: CreateUserInput) {
        return this.usersService.createUser(createUserInput);
    }

    @Mutation('updateUser')
    async updatePet(@Args('input') input: UpdateUserInput) {
        return this.usersService.updateUser(input);
    }

    @Mutation('deleteUser')
    async deleteUser(@Args('petId') petId: string) {
        return this.usersService.deletePet(petId);
    }
    @Mutation('destroyUser')
    async destroyPet(@Args('userId') petId: string) {
        return this.usersService.destroyUser(petId);
    }
}
