import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import {
  CreateUserInput,
  PetOutput,
  UpdateUserInput,
  UserOutput,
  UserOutputWithPet,
} from 'src/graphql';
import { UsersService } from './users.service';
import { IDataloaders } from 'src/common/dataloader/dataloader.interface';
import { User } from './user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserOutput)
  async createUser(@Args('input') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation(() => UserOutput)
  async updateUser(@Args('input') input: UpdateUserInput) {
    return this.usersService.updateUser(input);
  }

  @Mutation(() => UserOutput)
  async deleteUser(@Args('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }

  @Mutation(() => UserOutput)
  async destroyUser(@Args('userId') userId: string) {
    return this.usersService.destroyUser(userId);
  }

  @Query(() => [UserOutputWithPet])
  async listUser(): Promise<UserOutputWithPet[]> {
    return this.usersService.listUser();
  }

  @ResolveField(() => [PetOutput])
  async pets(
    @Parent() user: UserOutputWithPet,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    return loaders.petsLoader.load(user.id);
  }
}
