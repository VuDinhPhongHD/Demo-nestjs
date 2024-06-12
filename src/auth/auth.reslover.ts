import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginResponse, LoginUserInput } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver(() => LoginResponse)
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    async login(@Context() context) {
        return this.authService.login(context.user);
    }

    @Mutation(() => LoginResponse)
    async refresherToken(@Args('refresh_token') refresh_token: string) {
        return this.authService.processNewToken(refresh_token);
    }
}
