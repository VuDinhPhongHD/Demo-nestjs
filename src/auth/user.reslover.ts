import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from "src/users/user.entity";
import { AuthService } from "./auth.service";
import { LoginResponse, LoginUserInput } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';


@Resolver(() => User)
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args("loginUserInput") loginUserInput: LoginUserInput) {
        return this.authService.login(loginUserInput);
    }
}
