import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput } from 'src/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';

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
    async deleteUser(@Args('userId') userId: string) {
        return this.usersService.deleteUser(userId);
    }
    @Mutation('destroyUser')
    async destroyUser(@Args('userId') userId: string) {
        return this.usersService.destroyUser(userId);
    }
}
