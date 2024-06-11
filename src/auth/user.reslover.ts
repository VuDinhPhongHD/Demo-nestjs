import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from "src/users/user.entity";
import { AuthService } from "./auth.service";
import { SignInUserInput, UserOutput } from "src/graphql";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => User)
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Query('SignIn')
    async findAll(@Args('input') input: SignInUserInput) {
        return this.authService.signIn(input);
    }
}
